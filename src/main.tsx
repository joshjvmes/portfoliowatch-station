import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Create root element if it doesn't exist
const rootElement = document.getElementById("root") || (() => {
  const element = document.createElement("div");
  element.id = "root";
  document.body.appendChild(element);
  return element;
})();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);