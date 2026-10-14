const BRIDGE_KEY = "C3B7563B-BF85-45B7-88FC-7CFF1BD3C2DB";

const EXTENSION_URL =
  "https://chromewebstore.google.com/detail/%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80-%D1%80%D1%83%D1%82%D0%BE%D0%BA%D0%B5%D0%BD-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD/ohedcglhbbfdgaogjhcclacoccbagkjg?hl=ru";
const PLUGIN_URL =
  "https://download.rutoken.ru/Rutoken_Plugin/4.8.0.0/Windows/RutokenPlugin.msi";

let pluginPromise = null;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitForBridge(timeoutMs) {
  if (window[BRIDGE_KEY]) return Promise.resolve(true);
  return new Promise((resolve) => {
    const started = Date.now();
    const timer = setInterval(() => {
      if (window[BRIDGE_KEY] || Date.now() - started >= timeoutMs) {
        clearInterval(timer);
        resolve(Boolean(window[BRIDGE_KEY]));
      }
    }, 50);
  });
}

function toArray(devices) {
  if (!devices) return [];
  if (Array.isArray(devices)) return devices;
  if (typeof devices.length === "number") return Array.prototype.slice.call(devices);
  return [];
}

export function rutokenFailText(error) {
  if (error?.message === "EXTENSION_MISSING") {
    return {
      message: "Адаптер Рутокен не подключён к этому сайту",
      description:
        "На других сайтах токен виден, если расширению разрешён доступ. Chrome: Расширения → Адаптер Рутокен Плагин → Подробнее → Доступ к сайтам → На всех сайтах. Затем обновите страницу.",
      href: EXTENSION_URL,
      hrefText: "Установить адаптер",
    };
  }
  if (error?.message === "PLUGIN_MISSING") {
    return {
      message: "Рутокен Плагин не установлен",
      description: "Установите Рутокен Плагин и обновите страницу.",
      href: PLUGIN_URL,
      hrefText: "Скачать плагин",
    };
  }
  return {
    message: "Рутокен не обнаружен",
    description:
      "Подключите Рутокен к компьютеру и нажмите «Обновить список рутокенов». Если устройство подключено, но не определяется, проверьте, что расширению «Адаптер Рутокен Плагин» предоставлен доступ к данному сайту, и перезагрузите страницу.",
  };
}

export function loadRutokenPlugin() {
  if (!pluginPromise) {
    pluginPromise = (async () => {
      await waitForBridge(2500);
      const rutokenModule = await import("@aktivco/rutoken-plugin");
      const rutoken = rutokenModule.default || rutokenModule;
      await rutoken.ready;
      const isFirefox =
        typeof window.InstallTrigger !== "undefined" ||
        (/firefox/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent));
      if (window.chrome || isFirefox) {
        if (!(await rutoken.isExtensionInstalled())) {
          throw new Error("EXTENSION_MISSING");
        }
      }
      if (!(await rutoken.isPluginInstalled())) {
        throw new Error("PLUGIN_MISSING");
      }
      const plugin = await rutoken.loadPlugin();
      if (!plugin) throw new Error("PLUGIN_MISSING");
      return plugin;
    })().catch((error) => {
      pluginPromise = null;
      throw error;
    });
  }
  return pluginPromise;
}

export async function listRutokenDevices(plugin) {
  const deadline = Date.now() + 4000;
  let devices = [];
  do {
    devices = toArray(await plugin.enumerateDevices());
    if (devices.length) return devices;
    await delay(300);
  } while (Date.now() < deadline);
  return devices;
}

function errorCode(error) {
  const code = parseInt(error?.message ?? error, 10);
  return Number.isNaN(code) ? null : code;
}

export function rutokenErrorText(plugin, error) {
  const codes = plugin?.errorCodes || {};
  const code = errorCode(error);
  if (code === null) return String(error?.message || error || "Неизвестная ошибка");
  if (code === codes.PIN_INCORRECT) return "Неверный пин код";
  if (code === codes.PIN_LOCKED) return "Пин код заблокирован";
  if (code === codes.PIN_LENGTH_INVALID) return "Неверная длина пин кода";
  if (code === codes.DEVICE_NOT_FOUND) return "Рутокен отключён. Подключите его и обновите список";
  if (code === codes.CERTIFICATE_NOT_FOUND) return "Сертификат не найден на Рутокене";
  const name = Object.keys(codes).find((key) => codes[key] === code);
  return `Ошибка Рутокен: ${name || code}`;
}

// Токен может остаться залогиненным после входа на сайт через Рутокен —
// повторный login тогда падает с ALREADY_LOGGED_IN, поэтому сначала выходим.
export async function loginRutoken(plugin, device, pin) {
  try {
    await plugin.logout(device);
  } catch (e) {
    // не был залогинен
  }
  try {
    await plugin.login(device, pin);
  } catch (error) {
    if (errorCode(error) !== plugin.errorCodes?.ALREADY_LOGGED_IN) throw error;
  }
}

export async function logoutRutoken(plugin, device) {
  try {
    await plugin.logout(device);
  } catch (e) {
    // уже не залогинен
  }
}

export async function listRutokenCerts(plugin, device) {
  const categories = [
    plugin.CERT_CATEGORY_USER ?? 1,
    plugin.CERT_CATEGORY_UNSPEC ?? 0,
  ];
  const ids = [];
  for (const category of categories) {
    try {
      for (const id of toArray(await plugin.enumerateCertificates(device, category))) {
        if (!ids.includes(id)) ids.push(id);
      }
    } catch (e) {
      // категория не поддерживается
    }
  }
  const list = [];
  for (const cert of ids) {
    const { subject } = await plugin.parseCertificate(device, cert);
    const fields = subject.reduce((acc, item) => {
      acc[item.rdn] = item.value;
      return acc;
    }, {});
    list.push({
      value: cert,
      label: `${fields.commonName} | ${fields.organizationName}`,
      data: { ...fields, cert },
    });
  }
  return list;
}
