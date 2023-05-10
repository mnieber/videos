import React from 'react';
import { createScene } from '/src/scenes/Scene';
import { Script } from '/src/script/Script';
import { ScriptContext } from '/src/script/hooks/useScript';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

export const ScriptProvider = (props: PropsT) => {
  const script = useBuilder(() => {
    const script = new Script();
    script.rootScene = createScene();
    return script;
  });

  return (
    <ScriptContext.Provider value={script}>
      {props.children}
    </ScriptContext.Provider>
  );
};
