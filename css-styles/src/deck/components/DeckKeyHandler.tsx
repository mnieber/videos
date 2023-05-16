import * as R from 'ramda';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useDeck } from '/src/deck/hooks/useDeck';
import { createKeyDownHandler } from '/src/utils/createKeyDownHandler';

export type PropsT = React.PropsWithChildren<{}>;

export const DeckKeyHandler = (props: PropsT) => {
  const deck = useDeck();

  const keyHandlers = {
    arrowDown: () => {
      deck.goToNextSlide();
    },
    arrowUp: () => {
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
