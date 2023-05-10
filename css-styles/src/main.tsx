import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ScriptKeyHandler } from '/src/script/components/ScriptKeyHandler';
import { ScriptProvider } from '/src/script/components/ScriptProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ScriptProvider>
      <ScriptKeyHandler>
        <App />
      </ScriptKeyHandler>
    </ScriptProvider>
  </React.StrictMode>
);
