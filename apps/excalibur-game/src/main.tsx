import React from 'react';
import { createRoot } from 'react-dom/client';

import './style.css';
import { App } from './app';

const container = document.querySelector('[data-app]');
if (container) {
  const root = createRoot(container); // createRoot(container!) if you use TypeScript
  root.render(<App />);
}
