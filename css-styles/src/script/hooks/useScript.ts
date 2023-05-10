import React from 'react';
import { Script } from '/src/script/Script';

export const ScriptContext = React.createContext<Script | null>(null);

export const useScript = () => {
  const script = React.useContext(ScriptContext);
  if (!script) throw new Error('ScriptContext not found');
  return script;
};
