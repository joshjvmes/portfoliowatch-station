import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Buffer } from 'buffer';

// Polyfill Buffer for the browser
window.Buffer = Buffer;
globalThis.Buffer = Buffer;

// Create root element if it doesn't exist
const rootElement = document.getElementById('root');
if (!rootElement) {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);