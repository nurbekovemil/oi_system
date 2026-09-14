export function flatten(value, acc = {}, prefix = "") {
  if (value == null) return acc;
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const rdnKey =
        item?.rdn ||
        item?.oid ||
        item?.name ||
        item?.type ||
        (item?.id && (item.value != null || item.val != null) ? item.id : "");
      if (item && typeof item === "object" && rdnKey) {
        acc[rdnKey] = item.value ?? item.val ?? item.text ?? "";
      } else {
        flatten(item, acc, prefix ? `${prefix}.${i}` : String(i));
      }
    });
    return acc;
  }
  if (typeof value === "object") {
    Object.entries(value).forEach(([key, val]) => {
      if (val && typeof val === "object") flatten(val, acc, key);
      else acc[prefix ? `${prefix}.${key}` : key] = val;
    });
    return acc;
  }
  if (prefix) acc[prefix] = value;
  return acc;
}

export function firstProp(obj, keys) {
  if (!obj || typeof obj !== "object") return undefined;
  const lower = {};
  Object.entries(obj).forEach(([key, val]) => {
    lower[key.toLowerCase()] = val;
  });
  for (const key of keys) {
    const val = obj[key] ?? lower[String(key).toLowerCase()];
    if (val != null && val !== "") return val;
  }
  return undefined;
}

export function dnToAttrs(dn) {
  const acc = {};
  String(dn)
    .split(/[,/\n]/)
    .forEach((part) => {
      const m = part.match(/^\s*([^=]+?)\s*=\s*(.+?)\s*$/);
      if (m) acc[m[1].trim()] = m[2].trim();
    });
  return acc;
}

export function attrValue(attrs, ...names) {
  const entries = Object.entries(attrs || {});
  for (const name of names) {
    if (attrs[name]) return attrs[name];
    const found = entries.find(
      ([key]) => key.split(".").pop()?.toLowerCase() === String(name).toLowerCase()
    );
    if (found) return found[1];
  }
  return "";
}

export function cnFromSubject(subjectName) {
  const m = String(subjectName || "").match(
    /(?:^|[,/\n])\s*CN\s*=\s*([^,/\n]+)/i
  );
  return m ? m[1].trim() : "";
}

function isTechLabel(text) {
  const s = String(text || "").trim();
  if (!s) return true;
  if (/[А-ЯЁа-яё]{2,}\s+[А-ЯЁа-яё]{2,}/.test(s)) return false;
  return /gost|rsa|ecdsa|sha-?256|2012|контейнер|container/i.test(s);
}

export function pickPersonName(...candidates) {
  for (const value of candidates) {
    const text = String(value || "").trim();
    if (!text || isTechLabel(text)) continue;
    const fromCn = cnFromSubject(text);
    if (fromCn && !isTechLabel(fromCn)) return fromCn;
    if (!/^[A-Z0-9._-]+=/.test(text)) return text;
  }
  return "";
}

function isCertTimestamp(value) {
  const d = String(value || "");
  if (d.length !== 12) return false;
  const mm = Number(d.slice(2, 4));
  const dd = Number(d.slice(4, 6));
  return mm >= 1 && mm <= 12 && dd >= 1 && dd <= 31;
}

export function isJunkInn(value) {
  const d = String(value || "");
  if (d.length === 15 && d.startsWith("2")) return false;
  return (
    !d ||
    d.length < 10 ||
    d.length > 14 ||
    d.length === 12 ||
    isCertTimestamp(d) ||
    /^0+$/.test(d) ||
    /^(\d)\1+$/.test(d)
  );
}

export function normalizeInn(value) {
  const d = String(value ?? "").replace(/\D/g, "");
  if (d.length === 15 && d.startsWith("2") && !isCertTimestamp(d.slice(0, 14))) {
    return d.slice(0, 14);
  }
  if (isJunkInn(d)) return "";
  return d;
}

export function innsFromText(value) {
  const text = String(value ?? "");
  const out = new Set();
  const compact = normalizeInn(text);
  if (compact) out.add(compact);
  (text.match(/\d{10,15}/g) || []).forEach((part) => {
    const inn = normalizeInn(part);
    if (inn) out.add(inn);
  });
  return [...out];
}

export function innsFromAttrs(attrs) {
  return [...new Set(Object.values(attrs || {}).flatMap(innsFromText))];
}

export function isHexBlob(value) {
  const s = String(value || "");
  return /^[0-9a-f]+$/i.test(s) && /[a-f]/i.test(s) && s.length >= 16;
}

export function emptyIdentity() {
  return {
    inns: [],
    personIdnp: "",
    organizationInn: "",
    PIN: "",
    INN: "",
    serialNumber: "",
    issuerInns: [],
    subjectInns: [],
    commonName: "",
    organizationName: "",
  };
}

export function pemToBytes(pem) {
  const b64 = String(pem).replace(/-----[^-]+-----/g, "").replace(/\s/g, "");
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function readDerLen(bytes, index) {
  let i = index;
  let len = bytes[i++];
  if (len < 0x80) return { len, i };
  const count = len & 0x7f;
  len = 0;
  for (let k = 0; k < count; k += 1) len = (len << 8) | bytes[i++];
  return { len, i };
}

function parseTlv(bytes, i, end) {
  if (i >= end) return null;
  const tag = bytes[i++];
  const parsed = readDerLen(bytes, i);
  i = parsed.i;
  if (parsed.len < 0 || i + parsed.len > end) return null;
  return { tag, start: i, end: i + parsed.len, next: i + parsed.len };
}

function parseSequenceItems(bytes, start, end) {
  const items = [];
  let i = start;
  while (i < end) {
    const tlv = parseTlv(bytes, i, end);
    if (!tlv) break;
    items.push(tlv);
    i = tlv.next;
  }
  return items;
}

function parseOid(bytes, start, end) {
  if (start >= end) return "";
  const first = bytes[start];
  const parts = [Math.floor(first / 40), first % 40];
  let value = 0;
  for (let i = start + 1; i < end; i += 1) {
    value = (value << 7) | (bytes[i] & 0x7f);
    if ((bytes[i] & 0x80) === 0) {
      parts.push(value);
      value = 0;
    }
  }
  return parts.join(".");
}

function decodeDirString(bytes, tlv) {
  if (tlv.tag === 0x02) {
    let n = 0;
    for (let p = tlv.start; p < tlv.end; p += 1) {
      n = n * 256 + bytes[p];
    }
    return String(n);
  }
  if (tlv.tag === 0x1e && (tlv.end - tlv.start) % 2 === 0) {
    let text = "";
    for (let p = tlv.start; p < tlv.end; p += 2) {
      text += String.fromCharCode((bytes[p] << 8) | bytes[p + 1]);
    }
    return text;
  }
  return new TextDecoder("utf-8").decode(bytes.subarray(tlv.start, tlv.end));
}

function tbsNameTlvs(bytes) {
  const cert = parseTlv(bytes, 0, bytes.length);
  if (!cert || cert.tag !== 0x30) return {};
  const tbs = parseSequenceItems(bytes, cert.start, cert.end)[0];
  if (!tbs) return {};
  const fields = parseSequenceItems(bytes, tbs.start, tbs.end);
  let index = 0;
  if (fields[0] && (fields[0].tag & 0xe0) === 0xa0) index = 1;
  return {
    issuer: fields[index + 2] || null,
    subject: fields[index + 4] || null,
    extensions: fields.find((item) => item.tag === 0xa3) || null,
  };
}

function stringsInTlv(bytes, tlv) {
  if (!tlv) return [];
  const out = [];
  const walk = (start, end) => {
    let i = start;
    while (i < end) {
      const item = parseTlv(bytes, i, end);
      if (!item) break;
      if (
        item.tag === 0x0c ||
        item.tag === 0x13 ||
        item.tag === 0x16 ||
        item.tag === 0x12 ||
        item.tag === 0x1a ||
        item.tag === 0x1e ||
        item.tag === 0x02
      ) {
        out.push(decodeDirString(bytes, item));
      } else {
        walk(item.start, item.end);
      }
      i = item.next;
    }
  };
  walk(tlv.start, tlv.end);
  return out;
}

function nameAttrs(bytes, nameTlv) {
  if (!nameTlv) return {};
  const attrs = {};
  parseSequenceItems(bytes, nameTlv.start, nameTlv.end).forEach((rdn) => {
    parseSequenceItems(bytes, rdn.start, rdn.end).forEach((atav) => {
      const pair = parseSequenceItems(bytes, atav.start, atav.end);
      const oidTlv = pair.find((item) => item.tag === 0x06);
      const valTlv = pair.find((item) => item.tag !== 0x06);
      if (!oidTlv || !valTlv) return;
      attrs[parseOid(bytes, oidTlv.start, oidTlv.end)] = decodeDirString(
        bytes,
        valTlv
      );
    });
  });
  return attrs;
}

export function bytesToPem(bytes) {
  let bin = "";
  bytes.forEach((b) => {
    bin += String.fromCharCode(b);
  });
  return `-----BEGIN CERTIFICATE-----\n${btoa(bin)}\n-----END CERTIFICATE-----`;
}

export function certBodyToPem(body) {
  if (!body) return "";
  if (typeof body === "string") {
    if (/BEGIN CERTIFICATE/.test(body)) return body;
    const compact = body.replace(/\s/g, "");
    if (/^[0-9a-fA-F]+$/.test(compact) && compact.length % 2 === 0 && compact.length >= 32) {
      const bytes = new Uint8Array(compact.length / 2);
      for (let i = 0; i < bytes.length; i += 1) {
        bytes[i] = parseInt(compact.slice(i * 2, i * 2 + 2), 16);
      }
      return bytesToPem(bytes);
    }
    return `-----BEGIN CERTIFICATE-----\n${compact}\n-----END CERTIFICATE-----`;
  }
  if (Array.isArray(body) || body instanceof Uint8Array) {
    const bytes = body instanceof Uint8Array ? body : Uint8Array.from(body);
    return bytesToPem(bytes);
  }
  return certBodyToPem(body.cert || body.certificate || body.body || body.result);
}

export function readPemFields(pem) {
  if (!pem) return emptyIdentity();
  try {
    const bytes = pemToBytes(certBodyToPem(pem) || pem);
    const names = tbsNameTlvs(bytes);
    const subject = nameAttrs(bytes, names.subject);
    const extra = [
      ...stringsInTlv(bytes, names.subject),
      ...stringsInTlv(bytes, names.extensions),
    ].flatMap(innsFromText);
    const issuerInns = innsFromAttrs(nameAttrs(bytes, names.issuer));
    const surname = String(subject["10.10.0.3"] || "").trim();
    const givenName = String(subject["10.20.0.1"] || "").trim();
    const fio = [surname, givenName].filter(Boolean).join(" ");
    const cn = String(subject["172.16.1.2"] || "").trim();
    return {
      INN: normalizeInn(subject["10.20.0.1.643.3.131.1.1"]),
      serialNumber: normalizeInn(subject["10.20.0.2.5"]),
      organizationInn: normalizeInn(subject["10.20.0.1.643.100.4"]),
      personIdnp: normalizeInn(subject["192.168.0.3.1"]),
      commonName: pickPersonName(fio, cn),
      organizationName: String(subject["192.168.2.1"] || "").trim(),
      subjectInns: [...innsFromAttrs(subject), ...extra],
      issuerInns,
      inns: [...innsFromAttrs(subject), ...extra],
    };
  } catch {
    return emptyIdentity();
  }
}

export function readPkcs7Fields(signature) {
  if (!signature) return emptyIdentity();
  try {
    const bytes = pemToBytes(certBodyToPem(signature) || signature);
    const ids = [];
    const walk = (start, end) => {
      let i = start;
      while (i < end) {
        const tlv = parseTlv(bytes, i, end);
        if (!tlv) break;
        if (tlv.tag === 0x30) {
          const id = readPemFields(bytesToPem(bytes.subarray(i, tlv.next)));
          if (id.INN || id.serialNumber || id.organizationInn || id.inns?.length) {
            ids.push(id);
          }
          walk(tlv.start, tlv.end);
        }
        i = tlv.next;
      }
    };
    walk(0, bytes.length);
    return (
      ids.find((id) =>
        String(id.serialNumber || id.personIdnp || id.INN).startsWith("2")
      ) ||
      ids[0] ||
      emptyIdentity()
    );
  } catch {
    return emptyIdentity();
  }
}

export function scalarText(value) {
  if (value == null) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (typeof value === "boolean" || typeof value === "bigint") return String(value);
  try {
    if (typeof value.toString === "function") {
      const text = value.toString();
      if (text && text !== "[object Object]") return text;
    }
  } catch {
    /* */
  }
  return "";
}

export function errorBlob(error) {
  if (error == null) return "";
  if (typeof error !== "object") return String(error);
  const parts = [
    scalarText(error),
    scalarText(error.message),
    scalarText(error.description),
    scalarText(error.name),
    scalarText(error.error),
    scalarText(error.errorDescription),
    scalarText(error.errorMessage),
    scalarText(error.reason),
    scalarText(error.details),
    error.code,
    error.errorCode,
    error.stack,
  ];
  try {
    parts.push(JSON.stringify(error));
  } catch {
    /* circular */
  }
  return parts.filter((part) => part != null && part !== "").join(" ");
}

const PIN_RE =
  /ckr[\s._-]*pin|pin[\s._-]*incorrect|pin[\s._-]*invalid|incorrect[\s._-]*pin|invalid[\s._-]*pin|неверн\w*\s*(пин|pin)|wrong[\s._-]*pin/i;
const PIN_CODES = new Set([160, 161, 162, 163, 164, 0xa0, 0xa1, 0xa2, 0xa3, 0xa4]);

function pinCodeOf(error) {
  if (typeof error === "number") return error;
  const raw = error?.code ?? error?.errorCode ?? error?.message;
  const num = Number(raw);
  return Number.isFinite(num) ? num : NaN;
}

export function isWrongPin(error) {
  if (error == null) return false;
  if (PIN_CODES.has(pinCodeOf(error))) return true;
  return PIN_RE.test(errorBlob(error));
}

export function tokenErrorText(error, fallback) {
  if (isWrongPin(error) || isWrongPin(error?.message) || isWrongPin(error?.data)) {
    return "Неверный PIN-код";
  }
  if (error == null) return fallback;
  if (typeof error === "string" && error.trim()) {
    return PIN_RE.test(error) ? "Неверный PIN-код" : error;
  }
  const message = scalarText(error?.message);
  if (message && message !== "[object Object]") {
    return PIN_RE.test(message) ? "Неверный PIN-код" : message;
  }
  const data = error?.data;
  if (typeof data === "string" && data.trim()) {
    return PIN_RE.test(data) ? "Неверный PIN-код" : data;
  }
  if (typeof data?.message === "string") {
    return PIN_RE.test(data.message) ? "Неверный PIN-код" : data.message;
  }
  if (Array.isArray(data?.message)) return data.message.join(", ");
  if (typeof data?.errorMessage === "string") return data.errorMessage;
  const blob = errorBlob(error);
  if (PIN_RE.test(blob)) return "Неверный PIN-код";
  return fallback;
}
