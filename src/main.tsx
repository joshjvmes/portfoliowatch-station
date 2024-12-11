import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Buffer } from 'buffer';
import PanicOverlay from 'panic-overlay';

// Initialize panic-overlay for better error handling
if (import.meta.env.DEV) {
  new PanicOverlay();
}

// Polyfill Buffer for the browser
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);