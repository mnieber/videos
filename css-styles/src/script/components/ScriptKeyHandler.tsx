import * as R from 'ramda';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useScript } from '/src/script/hooks/useScript';
import { createKeyDownHandler } from '/src/utils/createKeyDownHandler';

export type PropsT = React.PropsWithChildren<{}>;

export const ScriptKeyHandler = (props: PropsT) => {
  const script = useScript();

  const keyHandlers = {
    space: () => {
      script.bumpStep();
    },
  };

  const handledKeys = R.keys(keyHandlers);
  const onKeyDown = createKeyDownHandler(keyHandlers);

  return (
    <KeyboardEventHandler handleKeys={handledKeys} onKeyEvent={onKeyDown}>
      {props.children}
    </KeyboardEventHandler>
  );
};
