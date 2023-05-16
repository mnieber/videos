import * as R from 'ramda';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useDeckModel } from '/src/deck/hooks/useDeckModel';
import { createKeyDownHandler } from '/src/utils/createKeyDownHandler';

export type PropsT = React.PropsWithChildren<{}>;

export const DeckKeyHandler = (props: PropsT) => {
  const deck = useDeckModel();

  const keyHandlers = {
    down: () => {
      deck.goToNextSlide();
    },
    up: () => {
      deck.goToPreviousSlide();
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
