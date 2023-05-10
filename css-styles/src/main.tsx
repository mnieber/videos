import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ScriptKeyHandler } from '/src/script/components/ScriptKeyHandler';
import { ScriptProvider } from '/src/script/components/ScriptProvider';

const strict = false;

const body = (
  <React.StrictMode>
    <ScriptProvider>
      <ScriptKeyHandler>
        <App />
      </ScriptKeyHandler>
    </ScriptProvider>
  </React.StrictMode>
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(strict ? <React.StrictMode>{body}</React.StrictMode> : body);
