import {
  certBodyToPem,
  dnToAttrs,
  emptyIdentity,
  flatten,
  innsFromText,
  isHexBlob,
  isWrongPin,
  normalizeInn,
  pickPersonName,
  readPemFields,
  readPkcs7Fields,
} from "./tokenCert";

const ESMART_HOST = "127.0.0.1";
const ESMART_PORT = 12179;

function splitEnotokenInns({
  INN,
  serialNumber,
  organizationInn,
  personIdnp,
  subjectInns = [],
  issuerInns = [],
}) {
  const inn = normalizeInn(INN);
  const serial = normalizeInn(serialNumber);
  const innle = normalizeInn(organizationInn);
  const pin = normalizeInn(personIdnp);
  const blocked = new Set(issuerInns.map(normalizeInn).filter(Boolean));
  // Как у Рутокена: INN = ПИН пользователя, SERIALNUMBER = ИНН организации
  let user = inn || pin;
  let company = serial || innle;
  if (serial.startsWith("2") && inn && !inn.startsWith("2")) {
    user = serial;
    company = inn;
  }
  const extras = [innle, inn, serial, pin, ...subjectInns.map(normalizeInn)].filter(
    (value) => value && !blocked.has(value)
  );
  if (!user) {
    user =
      extras.find((value) => value.startsWith("2")) ||
      extras.find((value) => value !== company) ||
      "";
  }
  if (!company || company === user) {
    company =
      extras.find((value) => value !== user && !value.startsWith("2")) ||
      extras.find((value) => value !== user) ||
      "";
  }
  return { user_inn: user, company_inn: company };
}

function applyEnotokenInns(fields) {
  const split = splitEnotokenInns(fields);
  return {
    ...emptyIdentity(),
    ...fields,
    personIdnp: split.user_inn,
    organizationInn: split.company_inn,
    PIN: split.user_inn,
    INN: fields.INN || split.user_inn,
    serialNumber: fields.serialNumber || split.company_inn,
    inns: [split.user_inn, split.company_inn].filter(Boolean),
  };
}

function pluginInn(cert, ...keys) {
  if (!cert || typeof cert !== "object") return "";
  for (const key of keys) {
    const raw = cert[key];
    if (raw == null || raw === "" || typeof raw === "object") continue;
    if (isHexBlob(String(raw))) continue;
    const inn = normalizeInn(raw);
    if (inn) return inn;
  }
  return "";
}

function pluginSubjectAttrs(cert) {
  const subject = cert?.subject || cert?.subjectName || cert?.dn;
  if (!subject) return {};
  if (typeof subject === "string") return dnToAttrs(subject);
  if (Array.isArray(subject)) {
    const acc = {};
    subject.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const key = item.rdn || item.oid || item.name || item.type || item.id;
      const val = item.value ?? item.val ?? item.text;
      if (key != null && val != null && val !== "") acc[String(key)] = val;
    });
    return acc;
  }
  if (typeof subject === "object") return flatten(subject);
  return {};
}

function extractEnotokenIdentity(cert) {
  const pem = certBodyToPem(
    cert?.content || cert?.pem || cert?.certificate || cert?.cert || ""
  );
  const fromPem = readPemFields(pem);
  const attrs = pluginSubjectAttrs(cert);
  const subjectText = typeof cert?.subject === "string" ? cert.subject : "";
  logCert("plugin cert", cert);
  logCert("plugin subject attrs", attrs);
  logCert("pem fields", fromPem);
  return applyEnotokenInns({
    INN:
      fromPem.INN ||
      normalizeInn(attrs.INN || attrs.inn || attrs["ИНН"] || attrs["1.2.643.3.131.1.1"]) ||
      pluginInn(cert, "INN", "inn", "ИНН"),
    serialNumber:
      fromPem.serialNumber ||
      normalizeInn(attrs.SERIALNUMBER || attrs["2.5.4.5"]) ||
      pluginInn(cert, "SERIALNUMBER", "serialNumber"),
    organizationInn:
      fromPem.organizationInn ||
      normalizeInn(attrs.INNLE || attrs.innle || attrs["1.2.643.100.4"]) ||
      pluginInn(cert, "INNLE", "innle", "organizationInn"),
    personIdnp:
      fromPem.personIdnp ||
      normalizeInn(attrs.PIN || attrs["ПИН"] || attrs.personIdnp || attrs.UID) ||
      pluginInn(cert, "PIN", "pin", "ПИН", "personIdnp", "UID", "uid"),
    commonName: pickPersonName(
      fromPem.commonName,
      cert?.subjectcn,
      cert?.subjectCN,
      cert?.commonName,
      cert?.label
    ),
    organizationName:
      fromPem.organizationName ||
      String(attrs.O || attrs.organizationName || cert?.organizationName || "").trim(),
    subjectInns: [
      ...(fromPem.subjectInns || []),
      ...innsFromText(subjectText),
      ...Object.values(attrs).flatMap(innsFromText),
    ],
    issuerInns: [
      ...(fromPem.issuerInns || []),
      ...innsFromText(
        typeof cert?.issuer === "string" ? cert.issuer : cert?.issuerName || ""
      ),
    ],
    pem,
  });
}

function logCert(label, data) {
  const omit = /^(pem|content|certificate|cert|signature|pkcs7|raw)$/i;
  const slim = (value, depth = 0) => {
    if (value == null || typeof value !== "object") return value;
    if (Array.isArray(value)) {
      return value.slice(0, 30).map((item) => slim(item, depth + 1));
    }
    const out = {};
    Object.entries(value).forEach(([key, val]) => {
      if (omit.test(key) && typeof val === "string") {
        out[key] = `${val.slice(0, 40)}… len=${val.length}`;
        return;
      }
      if (typeof val === "object" && depth < 2) out[key] = slim(val, depth + 1);
      else out[key] = val;
    });
    return out;
  };
  console.log(`[EnoToken] ${label}`, slim(data));
}

function parseMaybeJson(value) {
  let current = value;
  for (let i = 0; i < 3; i += 1) {
    if (typeof current !== "string") break;
    const text = current.trim();
    if (!text || (text[0] !== "{" && text[0] !== "[" && text[0] !== '"')) {
      break;
    }
    try {
      current = JSON.parse(text);
    } catch {
      break;
    }
  }
  return current;
}

function unwrapEsmart(message) {
  const value = parseMaybeJson(message);
  const obj = value && typeof value === "object" ? value : null;
  if (!obj) return value;
  if (String(obj.resp || "").toUpperCase() === "ERROR") {
    const err = obj.error || {};
    const error = new Error(esmartErrorText(err));
    error.code = err.code;
    throw error;
  }
  return parseMaybeJson(obj.result ?? obj.return ?? obj.data ?? value);
}

const ESMART_ERRORS = {
  "-2": "EnoToken не обнаружен. Подключите токен к компьютеру.",
  "-3": "Нет доступа к PKCS#11. Установите ESMART PKI Client.",
  "-4": "Сертификат на токене не найден.",
  "-6": "Не найден закрытый ключ сертификата.",
  "-7": "Ввод PIN-кода отменён.",
  "-12": "HTTP-режим ESMART не активирован.",
  "-15": "Нет связи с ESMART PKI Client.",
  160: "Неверный PIN-код",
  161: "Неверный PIN-код",
  162: "PIN-код заблокирован",
};

function esmartErrorText(err) {
  const code = err?.code;
  return (
    ESMART_ERRORS[code] ||
    ESMART_ERRORS[String(code)] ||
    err?.message ||
    "Ошибка ESMART плагина"
  );
}

let esmartReqId = 0;
let esmartQueue = Promise.resolve();
let esmartMode = null;
let esmartReady = false;

function esmartCall(cmd, data = {}, timeoutMs = 15000) {
  const run = () =>
    new Promise((resolve, reject) => {
      esmartReqId = (esmartReqId + 1) % 100;
      const requestid = esmartReqId;
      const timer = setTimeout(() => {
        window.removeEventListener("message", onMsg);
        reject(
          new Error(
            "Плагин ESMART не отвечает. Установите ESMART Token Web Plugin и разрешите его для этого сайта."
          )
        );
      }, timeoutMs);
      function onMsg(ev) {
        const d = ev.data;
        if (!d || d.direction !== "esmart-token-addon-message-response") return;
        if (Number(d.requestid) !== Number(requestid)) return;
        clearTimeout(timer);
        window.removeEventListener("message", onMsg);
        if (d.message == null) {
          reject(
            new Error(
              "Плагин не ответил. Включите расширение ESMART для этого сайта."
            )
          );
          return;
        }
        try {
          resolve(unwrapEsmart(d.message));
        } catch (e) {
          reject(e);
        }
      }
      window.addEventListener("message", onMsg);
      window.postMessage(
        {
          direction: "esmart-token-addon-message",
          message: JSON.stringify({ cmd, data }),
          requestid,
        },
        "*"
      );
    });
  const next = esmartQueue.then(run, run);
  esmartQueue = next.catch(() => {});
  return next;
}

async function waitForEsmartPlugin(ms = 3000) {
  if (window.esmartTokenWebVersionInfo) return;
  const started = Date.now();
  await new Promise((resolve, reject) => {
    const timer = setInterval(() => {
      if (window.esmartTokenWebVersionInfo) {
        clearInterval(timer);
        resolve();
      } else if (Date.now() - started > ms) {
        clearInterval(timer);
        reject(
          new Error(
            "Плагин ESMART не установлен или отключён для этого сайта."
          )
        );
      }
    }, 150);
  });
}

function parseEsmartList(value) {
  let current = parseMaybeJson(value);
  for (let i = 0; i < 4; i += 1) {
    if (Array.isArray(current)) return current;
    if (current && Array.isArray(current.slots)) return current.slots;
    if (current && Array.isArray(current.certs)) return current.certs;
    if (current && current.result != null) {
      current = parseMaybeJson(current.result);
      continue;
    }
    break;
  }
  return [];
}

function slotLooksPresent(slot) {
  if (!slot || typeof slot !== "object") return false;
  if (slot.validTokenPresent === true) return true;
  const flags = Number(slot.flags);
  if (Number.isFinite(flags) && (flags & 1)) return true;
  if (slot.label || slot.serialNumber || slot.model) return true;
  return slot.slot != null || slot.slotid != null;
}

async function setupEsmartNative() {
  await esmartCall("setupMode", { mode: "NATIVE" }, 8000);
}

async function listEsmartSlotsRaw() {
  return parseEsmartList(await esmartCall("listslots", {}, 15000));
}

async function probeEsmart() {
  const attempts = [
    {
      name: "HTTP",
      setup: () =>
        esmartCall(
          "setupMode",
          { mode: "HTTP", mode_data: { server: ESMART_HOST, port: ESMART_PORT } },
          8000
        ),
    },
    {
      name: "HTTP",
      setup: () =>
        esmartCall(
          "setupMode",
          { mode: "HTTP", mode_data: { server: "localhost", port: ESMART_PORT } },
          8000
        ),
    },
    { name: "NATIVE", setup: setupEsmartNative },
  ];
  let lastError;
  let emptySlots = [];
  for (const attempt of attempts) {
    try {
      await attempt.setup();
      const slots = await listEsmartSlotsRaw();
      esmartMode = attempt.name;
      esmartReady = true;
      if (slots.length) return slots;
      emptySlots = slots;
      lastError = new Error(
        "EnoToken не обнаружен. Подключите токен к компьютеру."
      );
      lastError.code = -2;
    } catch (error) {
      lastError = error;
    }
  }
  esmartReady = Boolean(esmartMode);
  if (emptySlots.length) return emptySlots;
  throw (
    lastError ||
    new Error("EnoToken не обнаружен. Подключите токен к компьютеру.")
  );
}

async function ensureEsmart() {
  if (esmartReady && esmartMode) return;
  try {
    await waitForEsmartPlugin(3000);
  } catch {
    /* content-script может не выставлять versionInfo — пробуем postMessage */
  }
  await probeEsmart();
}

function asArray(value) {
  return parseEsmartList(value);
}

function toCertId(id) {
  const text = String(id ?? "");
  if (/^[0-9a-fA-F]+$/.test(text) && text.length % 2 === 0) return text;
  if (/^\d+$/.test(text)) {
    let hex = Number(text).toString(16);
    if (hex.length % 2) hex = `0${hex}`;
    return hex;
  }
  return text;
}

async function listEnotokenDevices() {
  esmartReady = false;
  esmartMode = null;
  try {
    await waitForEsmartPlugin(3000);
  } catch {
    /* всё равно пробуем postMessage */
  }
  let slots;
  try {
    slots = await probeEsmart();
  } catch (error) {
    if (error?.code === -2 || error?.code === "-2") slots = [];
    else throw error;
  }
  const present = slots.filter(slotLooksPresent);
  const usable = present.length ? present : slots;
  return usable.map((slot) => ({
    id: String(slot.slot ?? slot.slotid ?? slot.id ?? 0),
    label:
      slot.label ||
      slot.model ||
      slot.slotDescription ||
      `EnoToken #${slot.slot ?? slot.slotid ?? 0}`,
  }));
}

async function listEnotokenCerts(deviceId) {
  await ensureEsmart();
  const certs = asArray(
    await esmartCall("listcerts", {
      slotsData: [{ slotid: Number(deviceId), validTokenPresent: true }],
    })
  );
  return certs.map((cert, i) => {
    const identity = extractEnotokenIdentity(cert);
    const fio = identity.commonName || `Сертификат ${i + 1}`;
    return {
      id: toCertId(cert.id ?? i),
      slot: cert.slot ?? Number(deviceId),
      label: fio,
      ...identity,
      commonName: fio,
    };
  });
}

async function unlockEnotoken(deviceId, pin) {
  if (!String(pin || "").trim()) {
    throw new Error("Введите PIN-код");
  }
  await ensureEsmart();
  try {
    await esmartCall("listcerts", {
      slotsData: [{ slotid: Number(deviceId), pin, validTokenPresent: true }],
    });
  } catch (error) {
    if (isWrongPin(error)) throw new Error("Неверный PIN-код");
    throw error;
  }
}

async function signEnotoken(deviceId, certId, payload, pin) {
  if (!String(pin || "").trim()) {
    throw new Error("Введите PIN-код");
  }
  await ensureEsmart();
  const result = await esmartCall("pkcs7sign", {
    certid: toCertId(certId),
    slot: Number(deviceId),
    data: payload,
    flag: 0x40,
    pin,
  });
  const pkcs7 = typeof result === "string" ? result : result?.pkcs7sign;
  if (!pkcs7) throw new Error("ESMART не вернул PKCS#7");
  return pkcs7;
}

export async function loginWithEnotoken(deviceId, certId, pin, api, selectedCert) {
  await unlockEnotoken(deviceId, pin);
  const challenge = await api.getChallenge();
  const challengeId = challenge?.challengeId;
  const nonce = challenge?.nonce;
  if (!challengeId || !nonce) {
    throw new Error("Сервер не вернул challenge для подписи");
  }
  let cert = selectedCert;
  if (!cert?.id) {
    const certs = await listEnotokenCerts(deviceId);
    cert = certs.find((item) => String(item.id) === String(certId)) || certs[0];
  }
  if (!cert?.id) {
    throw new Error("Сертификат на токене не обнаружен. Проверьте PIN и повторите.");
  }
  const signedCerts = asArray(
    await esmartCall("listcerts", {
      slotsData: [{ slotid: Number(deviceId), pin, validTokenPresent: true }],
    })
  );
  const refreshed =
    signedCerts.find((item) => toCertId(item.id) === String(cert.id)) || cert;
  cert = { ...cert, ...extractEnotokenIdentity(refreshed) };
  const signature = await signEnotoken(deviceId, cert.id, nonce, pin);
  if (!signature) {
    throw new Error("Токен не вернул подпись");
  }
  const fromPem = applyEnotokenInns(readPemFields(cert.pem));
  const fromPkcs7 = applyEnotokenInns(readPkcs7Fields(signature));
  const splitInput = {
    INN: fromPem.INN || fromPkcs7.INN || cert.INN,
    serialNumber: fromPem.serialNumber || fromPkcs7.serialNumber || cert.serialNumber,
    organizationInn:
      fromPem.organizationInn || fromPkcs7.organizationInn || cert.organizationInn,
    personIdnp: fromPem.personIdnp || fromPkcs7.personIdnp || cert.personIdnp,
    subjectInns: [
      ...(fromPem.inns || []),
      ...(fromPkcs7.inns || []),
      ...(cert.inns || []),
    ],
    issuerInns: [
      ...(fromPem.issuerInns || []),
      ...(fromPkcs7.issuerInns || []),
      ...(cert.issuerInns || []),
    ],
  };
  const { user_inn, company_inn } = splitEnotokenInns(splitInput);
  logCert("pem after sign", fromPem);
  logCert("pkcs7 fields", fromPkcs7);
  logCert("split input", splitInput);
  logCert("login inns", { user_inn, company_inn });
  if (!user_inn) {
    throw new Error("В сертификате нет ПИН/ИНН пользователя");
  }
  if (!company_inn) {
    throw new Error("В сертификате нет ИНН компании");
  }
  const result = await api.loginToken({
    tokenKind: "enotoken",
    challengeId,
    signature,
    user_inn,
    company_inn,
  });
  sessionStorage.setItem("auth_method", "enotoken");
  return result;
}

export async function signWithEnotoken(deviceId, certId, pin, payload, selectedCert) {
  await unlockEnotoken(deviceId, pin);
  let cert = selectedCert?.id ? selectedCert : null;
  if (!cert?.id) {
    const certs = await listEnotokenCerts(deviceId);
    cert = certs.find((item) => String(item.id) === String(certId)) || certs[0];
  }
  if (!cert?.id) {
    throw new Error("Сертификат на токене не обнаружен. Проверьте PIN и повторите.");
  }
  cert = { ...cert, ...extractEnotokenIdentity(cert) };
  const signature = await signEnotoken(deviceId, cert.id, payload, pin);
  if (!signature) {
    throw new Error("Токен не вернул подпись");
  }
  return {
    signature,
    cert: {
      commonName: cert.commonName,
      organizationName: cert.organizationName,
      INN: cert.organizationInn || cert.serialNumber,
      serialNumber: cert.serialNumber || cert.organizationInn,
      personIdnp: cert.personIdnp,
      organizationInn: cert.organizationInn || cert.serialNumber,
      cert: cert.id,
      tokenKind: "enotoken",
    },
  };
}

export const enotoken = {
  listDevices: listEnotokenDevices,
  listCerts: listEnotokenCerts,
  unlock: unlockEnotoken,
  signDetached: (session, data, pin) =>
    signEnotoken(session.deviceId, session.certId, data, pin),
};
