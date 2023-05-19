import * as R from 'ramda';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useDeckModel } from '/src/deck/hooks/useDeckModel';
import { cn } from '/src/utils/classnames';
import { createKeyDownHandler } from '/src/utils/createKeyDownHandler';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

export const DeckKeyHandler = (props: PropsT) => {
  const deck = useDeckModel();

  const keyHandlers = {
    down: () => {
      deck.goToNextSlide();
    },
    left: () => {
      deck.goToPreviousStep();
    },
    right: () => {
      deck.goToNextStep();
    },
    up: () => {
      deck.goToPreviousSlide();
    },
  };

  const handledKeys = R.keys(keyHandlers);
  const onKeyDown = createKeyDownHandler(keyHandlers);

  return (
    <KeyboardEventHandler
      handleKeys={handledKeys}
      onKeyEvent={onKeyDown}
      className={cn('KeyboardEventHandler', props.className)}
    >
      {props.children}
    </KeyboardEventHandler>
  );
};
