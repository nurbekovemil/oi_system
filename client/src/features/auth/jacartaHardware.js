import {
  attrValue,
  certBodyToPem,
  cnFromSubject,
  dnToAttrs,
  emptyIdentity,
  errorBlob,
  firstProp,
  flatten,
  innsFromAttrs,
  innsFromText,
  isWrongPin,
  normalizeInn,
  pickPersonName,
  readPemFields,
  scalarText,
} from "./tokenCert";

const JC_SCRIPTS = [
  "https://localhost:24738/JCWebClient.js",
  "https://localhost:24738/JCWebClient2.js",
];
const JC_LOAD_TIMEOUT_MS = 12000;
const JC_CALL_TIMEOUT_MS = 20000;
const JC_PIN_TIMEOUT_MS = 60000;
const ETOKEN_RE = /enotoken|safenet|gemalto/;
const PIN_RE =
  /ckr[\s._-]*pin|pin[\s._-]*incorrect|pin[\s._-]*invalid|incorrect[\s._-]*pin|invalid[\s._-]*pin|неверн\w*\s*(пин|pin)|wrong[\s._-]*pin/i;

function logJacarta(label, data) {
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
  console.log(`[JaCarta] ${label}`, slim(data));
}

function stripCertMeta(parsed) {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return parsed;
  const copy = { ...parsed };
  [
    "Issuer",
    "issuer",
    "issuerName",
    "IssuerName",
    "issuerDN",
    "SerialNumber",
    "serialNumber",
    "serial",
    "Validity",
    "validity",
    "validFrom",
    "validTo",
    "Signature",
    "signature",
  ].forEach((key) => {
    delete copy[key];
  });
  return copy;
}

function pickSubjectIssuer(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return { subject: parsed, issuer: "" };
  }
  const nested = firstProp(parsed, ["Data", "data", "certificate", "certInfo", "info"]);
  const subject = firstProp(parsed, [
    "Subject",
    "subject",
    "subjectName",
    "SubjectName",
    "subjectDN",
    "dn",
  ]);
  const issuer = firstProp(parsed, [
    "Issuer",
    "issuer",
    "issuerName",
    "IssuerName",
    "issuerDN",
  ]);
  if (subject == null && nested && typeof nested === "object" && nested !== parsed) {
    return pickSubjectIssuer(nested);
  }
  return { subject: subject ?? stripCertMeta(parsed), issuer: issuer ?? "" };
}

function attrsFromName(name) {
  if (name == null || name === "") return {};
  if (typeof name === "string") return dnToAttrs(name);
  if (Array.isArray(name)) {
    const acc = {};
    name.forEach((item) => {
      if (!item || typeof item !== "object") return;
      const key =
        item.rdn || item.oid || item.name || item.type || item.id || item.OID;
      const val = item.value ?? item.val ?? item.text ?? item.Value;
      if (key != null && val != null && val !== "") acc[String(key)] = val;
    });
    return acc;
  }
  if (typeof name === "object") {
    const { subject } = pickSubjectIssuer(name);
    if (subject && subject !== name) return attrsFromName(subject);
    return flatten(stripCertMeta(name));
  }
  return {};
}

function isPersonPin(value) {
  const d = normalizeInn(value);
  if (d.length !== 14 || !/^[12]/.test(d)) return false;
  const dd = Number(d.slice(1, 3));
  const mm = Number(d.slice(3, 5));
  return dd >= 1 && dd <= 31 && mm >= 1 && mm <= 12;
}

function splitJacartaInns({
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
  let user = inn || pin;
  let company = serial || innle;
  if (isPersonPin(serial) && inn && !isPersonPin(inn)) {
    user = serial;
    company = inn;
  }
  if (blocked.has(company)) company = innle && !blocked.has(innle) ? innle : "";
  if (blocked.has(user)) user = pin && !blocked.has(pin) ? pin : "";
  const extras = [innle, inn, serial, pin, ...subjectInns.map(normalizeInn)].filter(
    (value) => value && !blocked.has(value)
  );
  if (!company || company === user) {
    company =
      extras.find((value) => value !== user && !isPersonPin(value)) ||
      extras.find((value) => value !== user) ||
      "";
  }
  if (!user) {
    user =
      extras.find((value) => value !== company && isPersonPin(value)) ||
      extras.find((value) => value !== company) ||
      "";
  }
  return { user_inn: user, company_inn: company };
}

function applyJacartaInns(fields) {
  const split = splitJacartaInns(fields);
  return {
    ...fields,
    personIdnp: split.user_inn,
    organizationInn: split.company_inn,
    PIN: split.user_inn,
    INN: fields.INN || split.user_inn,
    serialNumber: fields.serialNumber || split.company_inn,
    inns: [split.user_inn, split.company_inn].filter(Boolean),
  };
}

function extractJacartaIdentity(parsed) {
  const { subject, issuer } = pickSubjectIssuer(parsed);
  const attrs = attrsFromName(subject);
  const issuerAttrs = attrsFromName(issuer);
  const subjectName =
    typeof subject === "string"
      ? subject
      : String(
          attrValue(attrs, "subjectName", "SubjectName", "dn") ||
            parsed?.subjectName ||
            ""
        );
  const inn = normalizeInn(
    attrValue(attrs, "INN", "inn", "ИНН", "1.2.643.3.131.1.1")
  );
  const serialNumber = normalizeInn(
    attrValue(attrs, "SERIALNUMBER", "2.5.4.5", "PIN", "ПИН")
  );
  const innle = normalizeInn(
    attrValue(attrs, "INNLE", "innle", "organizationInn", "1.2.643.100.4")
  );
  const surname = String(
    attrValue(attrs, "surname", "2.5.4.4") ||
      (attrValue(attrs, "SN") && !/^\d+$/.test(String(attrValue(attrs, "SN")))
        ? attrValue(attrs, "SN")
        : "")
  ).trim();
  const givenName = String(
    attrValue(attrs, "givenName", "GN", "G", "2.5.4.42") || ""
  ).trim();
  const fio = [surname, givenName].filter(Boolean).join(" ");
  const cnRaw =
    attrValue(attrs, "commonName", "CN", "subjectcn") ||
    cnFromSubject(subjectName) ||
    "";
  return applyJacartaInns({
    INN: inn,
    serialNumber,
    organizationInn: innle,
    personIdnp: normalizeInn(
      attrValue(attrs, "PIN", "pin", "ПИН", "personIdnp", "personPIN", "UID")
    ),
    commonName: pickPersonName(fio, cnRaw, subjectName),
    organizationName:
      String(
        attrValue(attrs, "organizationName", "O", "organization", "2.5.4.10") || ""
      ).trim() ||
      dnToAttrs(subjectName).O ||
      "",
    subjectInns: [...innsFromAttrs(attrs), ...innsFromText(subjectName)],
    issuerInns: innsFromAttrs(issuerAttrs),
  });
}

function identityFromJacartaPem(pem) {
  const fields = readPemFields(pem);
  return applyJacartaInns(fields);
}

function utf8ToB64(text) {
  return btoa(unescape(encodeURIComponent(text)));
}

let jcGeneration = 0;
let jcUnloadTimer = null;
let jacartaBound = null;

function clearJcUnloadTimer() {
  if (!jcUnloadTimer) return;
  clearTimeout(jcUnloadTimer);
  jcUnloadTimer = null;
}

function loadScript(src, generation) {
  return new Promise((resolve, reject) => {
    if (window.JCWebClient2) {
      resolve();
      return;
    }
    const parent = document.body || document.head;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;
    script.dataset.oiJc = "1";
    const timer = setTimeout(() => {
      script.remove();
      reject(
        new Error(
          "JC-WebClient не отвечает. Откройте https://localhost:24738 и примите сертификат."
        )
      );
    }, JC_LOAD_TIMEOUT_MS);
    script.onload = () => {
      clearTimeout(timer);
      if (generation !== jcGeneration) {
        script.remove();
        reject(new Error("JC-WebClient выгружен"));
        return;
      }
      if (window.JCWebClient2) resolve();
      else reject(new Error("JCWebClient is invalid"));
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      reject(new Error("JC-WebClient не запущен (localhost:24738)"));
    };
    parent.appendChild(script);
  });
}

function unloadJcNow() {
  jcGeneration += 1;
  jacartaBound = null;
  const api = window.JCWebClient2 || window.JCWebClient;
  if (!api) return;
  try {
    api.saveSession = false;
  } catch {
    /* */
  }
  try {
    api.closeWebSession?.();
  } catch {
    /* */
  }
  try {
    api._oiInitialized = false;
  } catch {
    /* */
  }
}

async function loadJc() {
  clearJcUnloadTimer();
  const generation = jcGeneration;
  let lastError;
  if (!window.JCWebClient2) {
    for (const src of JC_SCRIPTS) {
      try {
        await loadScript(src, generation);
        break;
      } catch (error) {
        lastError = error;
      }
    }
  }
  if (generation !== jcGeneration) {
    throw lastError || new Error("JC-WebClient выгружен");
  }
  const api = window.JCWebClient2;
  if (!api) {
    throw lastError || new Error("JC-WebClient не запущен (localhost:24738)");
  }
  if (!api._oiInitialized) {
    try {
      api.initialize?.({ licensing: { activationRequestUrl: null } });
    } catch {
      try {
        api.initialize?.();
      } catch {
        /* already initialized */
      }
    }
    try {
      api.defaults?.({ async: true });
    } catch {
      /* defaults unavailable */
    }
    try {
      api.saveSession = false;
    } catch {
      /* */
    }
    api._oiInitialized = true;
  }
  return api;
}

function unwrapJc(value) {
  if (value == null) return value;
  if (typeof value === "string" && /^CKR_/i.test(value.trim())) {
    throw value;
  }
  if (Array.isArray(value)) return value;
  if (typeof value === "object") {
    const fail = value.error ?? value.errorDescription ?? value.errorCode;
    if (fail && fail !== 0 && value.result === undefined) {
      throw value;
    }
    if (Array.isArray(value.result)) return value.result;
    if (value.result !== undefined) return value.result;
  }
  return value;
}

function jcError(error) {
  if (error == null) return new Error("Ошибка JC-WebClient");
  if (isWrongPin(error)) return new Error("Неверный PIN-код");
  if (error instanceof Error && error.message === "Неверный PIN-код") return error;
  const text = errorBlob(error);
  const lower = text.toLowerCase();
  if (/already|binded|logged/i.test(lower)) {
    return new Error("Токен уже привязан");
  }
  if (typeof error === "number") return new Error(`Код ошибки JC-WebClient: ${error}`);
  const shown = scalarText(error.message) || scalarText(error) || text;
  return new Error(PIN_RE.test(shown) ? "Неверный PIN-код" : shown || "Ошибка JC-WebClient");
}

function jcAsync(api, fn, args, timeoutMs) {
  return new Promise((resolve, reject) => {
    let settled = false;
    const finish = (ok, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (!ok) {
        reject(jcError(value));
        return;
      }
      try {
        resolve(unwrapJc(value));
      } catch (error) {
        reject(jcError(error));
      }
    };
    const timer = setTimeout(() => {
      finish(false, new Error("Таймаут JC-WebClient"));
    }, timeoutMs);
    const options = {
      async: true,
      onResult(result, error) {
        try {
          if (error || isWrongPin(result)) finish(false, error || result);
          else finish(true, result);
        } catch (callbackError) {
          finish(false, callbackError);
        }
      },
    };
    if (args != null) options.args = args;
    try {
      const ret = fn.call(api, options);
      if (ret && typeof ret.then === "function") {
        ret.then((result) => finish(true, result), (error) => finish(false, error));
      } else if (ret !== undefined) {
        finish(true, ret);
      }
    } catch (error) {
      finish(false, error);
    }
  });
}

function jc(api, method, args, timeoutMs = JC_CALL_TIMEOUT_MS) {
  const fn = api[method];
  if (typeof fn !== "function") {
    return Promise.reject(new Error(`JC-WebClient: нет ${method}`));
  }
  return jcAsync(api, fn, args, timeoutMs);
}

function slotId(slot) {
  if (slot == null) return null;
  if (typeof slot === "number") return slot;
  const id = slot.id ?? slot.tokenID ?? slot.tokenId ?? slot.slotID ?? slot.slotId;
  return id == null ? null : id;
}

async function listJacartaDevices() {
  const api = await loadJc();
  let raw = await jc(api, "getAllSlots").catch(() => null);
  if (!Array.isArray(raw) || !raw.length) {
    raw = await jc(api, "getAllTokens").catch(() => []);
  }
  const slots = Array.isArray(raw) ? raw : [];
  const items = [];
  for (const slot of slots) {
    if (slot?.tokenExists === false) continue;
    const id = slotId(slot);
    if (id == null) continue;
    const slotFp = JSON.stringify(slot).toLowerCase();
    if (ETOKEN_RE.test(slotFp)) continue;
    items.push({
      id: String(id),
      label:
        slot?.device?.modelFriendlyName ||
        slot?.device?.model ||
        slot?.device?.name ||
        slot?.label ||
        `JaCarta #${id}`,
    });
  }
  return items;
}

async function parseJacartaCert(deviceId, certId) {
  const api = await loadJc();
  const tokenID = Number(deviceId);
  const id = Number(certId);
  const body = await jc(api, "getCertificateBody", { tokenID, id }).catch(
    () => null
  );
  let parsed = await jc(api, "parseX509Certificate", { tokenID, id }).catch(
    () => null
  );
  if (!parsed && body) {
    parsed = await jc(api, "parseX509Certificate", { cert: body }).catch(
      () => null
    );
  }
  const pem =
    certBodyToPem(body) ||
    certBodyToPem(parsed?.cert || parsed?.certificate);
  const fromPem = identityFromJacartaPem(pem);
  const fromParsed = parsed ? extractJacartaIdentity(parsed) : emptyIdentity();
  logJacarta("JC parseX509Certificate", parsed);
  logJacarta("JC pem fields", fromPem);
  logJacarta("JC extracted", fromParsed);
  const issuerInns = [
    ...(fromPem.issuerInns || []),
    ...(fromParsed.issuerInns || []),
  ];
  return applyJacartaInns({
    ...fromParsed,
    ...fromPem,
    INN: fromPem.INN || fromParsed.INN,
    serialNumber: fromPem.serialNumber || fromParsed.serialNumber,
    organizationInn: fromPem.organizationInn || fromParsed.organizationInn,
    personIdnp: fromPem.personIdnp || fromParsed.personIdnp,
    subjectInns: [...(fromPem.inns || []), ...(fromParsed.inns || [])],
    issuerInns,
    pem,
    raw: parsed,
  });
}

async function listJacartaCerts(deviceId) {
  const api = await loadJc();
  const tokenID = Number(deviceId);
  const items = [];
  for (const m of ["getContainerList", "getStandaloneCertificateList"]) {
    const raw = await jc(api, m, { tokenID }).catch(() => []);
    if (Array.isArray(raw)) items.push(...raw);
  }
  const seen = new Set();
  const list = [];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    const id = String(item.id ?? item.containerID ?? item.contID ?? i);
    if (seen.has(id)) continue;
    seen.add(id);
    const parsed = await parseJacartaCert(deviceId, id);
    const identity = { ...extractJacartaIdentity(item), ...parsed };
    const fio =
      pickPersonName(
        identity.commonName,
        parsed.commonName,
        parsed.raw?.subjectName,
        item.subjectName,
        item.friendlyName
      ) || `Сертификат ${i + 1}`;
    list.push({
      id,
      label: fio,
      pem: parsed.pem || item.cert || item.certificate,
      ...identity,
      commonName: identity.commonName || fio,
    });
  }
  return list;
}

function tokenMatchesState(state, tokenID) {
  if (tokenID == null || state == null || typeof state !== "object") return true;
  if (state.tokenID == null && state.tokenId == null) return true;
  return Number(state.tokenID ?? state.tokenId) === Number(tokenID);
}

async function isJacartaBinded(api, tokenID) {
  const state = await jc(api, "getLoggedInState").catch(() => null);
  if (state == null || state === false) return false;
  const bindedVal = api.Vars?.AuthState?.binded;
  const bindedSecure = api.Vars?.AuthState?.bindedSecure;
  const notBindedVal = api.Vars?.AuthState?.notBinded;
  const raw =
    typeof state === "object"
      ? state.state ?? state.authState ?? state
      : state;
  if (raw === false || raw === notBindedVal || raw === 0) return false;
  if (typeof raw === "string" && /not.?bind/i.test(raw)) return false;
  const loggedIn =
    raw === true ||
    raw === bindedVal ||
    raw === bindedSecure ||
    raw === 1 ||
    raw === 2 ||
    (typeof raw === "string" && /bind/i.test(raw));
  if (!loggedIn) return false;
  return tokenMatchesState(state, tokenID);
}

async function forceUnbind(api, tokenID) {
  jacartaBound = null;
  const calls = [];
  if (tokenID != null && Number.isFinite(Number(tokenID))) {
    calls.push(() => jc(api, "unbindToken", { tokenID: Number(tokenID) }));
  }
  calls.push(() => jc(api, "unbindToken"));
  calls.push(() => {
    api.unbindToken?.();
    return Promise.resolve();
  });
  for (const call of calls) {
    try {
      await call();
    } catch {
      /* already unbound */
    }
    if (!(await isJacartaBinded(api, tokenID))) return true;
  }
  try {
    api.saveSession = false;
  } catch {
    /* */
  }
  try {
    api.closeWebSession?.();
  } catch {
    /* */
  }
  try {
    api._oiInitialized = false;
  } catch {
    /* */
  }
  return !(await isJacartaBinded(api, tokenID));
}

async function ensureJacartaBound(deviceId, pin, { force } = {}) {
  if (!String(pin || "").trim()) {
    throw new Error("Введите PIN-код");
  }
  const api = await loadJc();
  const tokenID = Number(deviceId);
  const samePin =
    !force &&
    jacartaBound?.deviceId === String(deviceId) &&
    jacartaBound?.pin === pin;
  if (samePin && (await isJacartaBinded(api, tokenID))) {
    return api;
  }
  const unbound = await forceUnbind(api, tokenID);
  if (!unbound && (await isJacartaBinded(api, tokenID))) {
    throw new Error(
      "Не удалось закрыть сессию токена. Выньте токен, вставьте снова и введите PIN."
    );
  }
  const freshApi = await loadJc();
  try {
    await jc(freshApi, "bindToken", { tokenID, pin }, JC_PIN_TIMEOUT_MS);
  } catch (error) {
    jacartaBound = null;
    await forceUnbind(freshApi, tokenID);
    if (/already|binded|logged/i.test(errorBlob(error))) {
      throw new Error(
        "Не удалось закрыть сессию токена. Выньте токен, вставьте снова и введите PIN."
      );
    }
    throw jcError(error);
  }
  if (!(await isJacartaBinded(freshApi, tokenID))) {
    jacartaBound = null;
    await forceUnbind(freshApi, tokenID);
    throw new Error("Неверный PIN-код");
  }
  jacartaBound = { deviceId: String(deviceId), pin };
  return freshApi;
}

async function unlockJacarta(deviceId, pin, options) {
  await ensureJacartaBound(deviceId, pin, options);
}

function toPkcs7B64(signed) {
  if (typeof signed === "string" && signed) return signed;
  if (Array.isArray(signed) && signed.length) {
    let bin = "";
    signed.forEach((b) => {
      bin += String.fromCharCode(b);
    });
    return btoa(bin);
  }
  return signed?.result ?? signed?.signature ?? signed?.pkcs7sign;
}

async function signJacarta(deviceId, contID, payload, pin) {
  const api = await ensureJacartaBound(deviceId, pin);
  const data = utf8ToB64(payload);
  const signed = await jc(
    api,
    "signBase64EncodedData",
    {
      tokenID: Number(deviceId),
      contID: Number(contID),
      data,
      attachedSignature: false,
    },
    JC_PIN_TIMEOUT_MS
  );
  const pkcs7 = toPkcs7B64(signed);
  if (!pkcs7) throw new Error("JaCarta не вернула подпись");
  return pkcs7;
}

export function stopJcSession() {
  clearJcUnloadTimer();
  jcUnloadTimer = setTimeout(() => {
    jcUnloadTimer = null;
    unloadJcNow();
  }, 150);
}

export function unloadJcSession() {
  clearJcUnloadTimer();
  unloadJcNow();
}

export async function loginWithJacarta(deviceId, certId, pin, api, selectedCert) {
  await unlockJacarta(deviceId, pin, { force: true });
  const challenge = await api.getChallenge();
  const challengeId = challenge?.challengeId;
  const nonce = challenge?.nonce;
  if (!challengeId || !nonce) {
    throw new Error("Сервер не вернул challenge для подписи");
  }
  let cert = selectedCert;
  if (!cert?.id) {
    const certs = await listJacartaCerts(deviceId);
    cert = certs.find((item) => String(item.id) === String(certId)) || certs[0];
  }
  if (!cert?.id) {
    throw new Error("Сертификат на токене не обнаружен. Проверьте PIN и повторите.");
  }
  cert = { ...cert, ...(await parseJacartaCert(deviceId, cert.id)) };
  logJacarta("parsed cert", cert);
  const signature = await signJacarta(deviceId, cert.id, nonce, pin);
  if (!signature) {
    throw new Error("Токен не вернул подпись");
  }
  const fromPem = identityFromJacartaPem(cert.pem);
  const splitInput = {
    INN: fromPem.INN || cert.INN,
    serialNumber: fromPem.serialNumber || cert.serialNumber,
    organizationInn: fromPem.organizationInn || cert.organizationInn,
    personIdnp: fromPem.personIdnp || cert.personIdnp,
    subjectInns: [...(fromPem.inns || []), ...(cert.inns || [])],
    issuerInns: [...(fromPem.issuerInns || []), ...(cert.issuerInns || [])],
  };
  const { user_inn, company_inn } = splitJacartaInns(splitInput);
  logJacarta("pem fields", fromPem);
  logJacarta("split input", splitInput);
  logJacarta("login inns", { user_inn, company_inn });
  if (!user_inn) {
    throw new Error("В сертификате нет ПИН/ИНН пользователя");
  }
  if (!company_inn) {
    throw new Error("В сертификате нет ИНН компании");
  }
  const result = await api.loginToken({
    tokenKind: "jacarta",
    challengeId,
    signature,
    user_inn,
    company_inn,
  });
  sessionStorage.setItem("auth_method", "jacarta");
  return result;
}

export async function signWithJacarta(deviceId, certId, pin, payload, selectedCert) {
  await unlockJacarta(deviceId, pin, { force: true });
  let cert = selectedCert?.id ? selectedCert : null;
  if (!cert?.id) {
    const certs = await listJacartaCerts(deviceId);
    cert = certs.find((item) => String(item.id) === String(certId)) || certs[0];
  }
  if (!cert?.id) {
    throw new Error("Сертификат на токене не обнаружен. Проверьте PIN и повторите.");
  }
  cert = { ...cert, ...(await parseJacartaCert(deviceId, cert.id)) };
  const signature = await signJacarta(deviceId, cert.id, payload, pin);
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
      tokenKind: "jacarta",
    },
  };
}

export const jacarta = {
  listDevices: listJacartaDevices,
  listCerts: listJacartaCerts,
  unlock: unlockJacarta,
  signDetached: (session, data, pin) =>
    signJacarta(session.deviceId, session.certId, data, pin),
};
