import { tokenErrorText } from "./tokenCert";
import {
  jacarta,
  loginWithJacarta,
  signWithJacarta,
  stopJcSession,
  unloadJcSession,
} from "./jacartaHardware";
import {
  enotoken,
  loginWithEnotoken,
  signWithEnotoken,
} from "./enotokenHardware";

export { tokenErrorText };

export const TOKEN_SOFTWARE = {
  jacarta: {
    name: "JC-WebClient",
    href: "https://aladdin-rd.ru/support/downloads/jacarta_egais/",
  },
  enotoken: {
    name: "ESMART PKI Client",
    href: "https://token.esmart.ru/downloads",
    pluginHref:
      "https://chromewebstore.google.com/detail/esmart-token-web-plugin/cblhedkfmbhcikepclfiehohcpfpbmnb",
  },
};

export function getTokenAdapter(kind) {
  if (kind === "jacarta") return jacarta;
  if (kind === "enotoken") return enotoken;
  throw new Error(`Неизвестный тип токена: ${kind}`);
}

export { stopJcSession };

export function resetTokenSession() {
  sessionStorage.removeItem("auth_method");
  unloadJcSession();
}

export async function loginWithToken(kind, deviceId, certId, pin, api, selectedCert) {
  if (kind === "jacarta") {
    return loginWithJacarta(deviceId, certId, pin, api, selectedCert);
  }
  if (kind === "enotoken") {
    return loginWithEnotoken(deviceId, certId, pin, api, selectedCert);
  }
  throw new Error(`Неизвестный тип токена: ${kind}`);
}

export async function signWithToken(kind, deviceId, certId, pin, payload, selectedCert) {
  if (kind === "jacarta") {
    return signWithJacarta(deviceId, certId, pin, payload, selectedCert);
  }
  if (kind === "enotoken") {
    return signWithEnotoken(deviceId, certId, pin, payload, selectedCert);
  }
  throw new Error(`Неизвестный тип токена: ${kind}`);
}
