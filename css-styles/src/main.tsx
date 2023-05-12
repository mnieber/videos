// Import styles. This needs to be done before importing any components.
import '/src/frames/styles/index.scss';

import { applyFormatters } from 'mobx-log';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '/src/app/components';

const strict = false;

if (import.meta.env.DEV) {
  applyFormatters();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const body = <App />;

root.render(strict ? <React.StrictMode>{body}</React.StrictMode> : body);
