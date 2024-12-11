import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Buffer } from 'buffer';
import PanicOverlay from 'panic-overlay';

// Polyfill Buffer for the browser
window.Buffer = Buffer;
globalThis.Buffer = Buffer;

// Initialize PanicOverlay in development with configuration
if (import.meta.env.DEV) {
  new PanicOverlay({
    // Default configuration
    stackEntryClickHandler: true,
    shortcutKey: 'Escape',
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);