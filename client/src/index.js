import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

const resizeObserverMessage = "ResizeObserver loop completed with undelivered notifications.";

function isIgnorableBrowserError(event) {
  const message = String(event?.message || "");
  const filename = String(event?.filename || event?.error?.fileName || "");
  if (message === resizeObserverMessage) return true;
  if (/JCWebClient|localhost:24738|127\.0\.0\.1:24738/i.test(filename)) return true;
  if (message === "Script error." && !filename) return true;
  return false;
}

window.addEventListener(
  "error",
  (event) => {
    if (!isIgnorableBrowserError(event)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  },
  true
);

window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason;
  const text = String(reason?.message || reason?.stack || reason || "");
  const filename = String(reason?.filename || reason?.fileName || "");
  if (
    text === "Script error." ||
    /JCWebClient|localhost:24738|CKR_|jcext/i.test(`${text} ${filename}`)
  ) {
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
