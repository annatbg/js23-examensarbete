// src/index.js or src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // Your global styles (if any)
import App from "./App.jsx"; // Import your App component

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
