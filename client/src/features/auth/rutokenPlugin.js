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
      "Подключите токен и нажмите «Обновить». Если на других сайтах он есть, разрешите адаптеру доступ к этому сайту и обновите страницу.",
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
