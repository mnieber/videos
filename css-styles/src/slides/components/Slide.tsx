import { observer } from 'mobx-react-lite';
import React from 'react';
import { useDeckModel } from '/src/deck/hooks/useDeckModel';
import { L } from '/src/frames/layout';
import { SlideContext } from '/src/slides/hooks/useSlideModel';
import { cn } from '/src/utils/classnames';

// Import styles
import './Slide.scss';

export type PropsT = React.PropsWithChildren<{
  id: string;
  nrOfSteps: number;
  className?: string;
}>;

export const Slide = observer((props: PropsT) => {
  const slideId = `slide-${props.id}`;

  const deck = useDeckModel();
  if (!deck) {
    throw new Error('Slide must be used within a Deck');
  }

  React.useEffect(() => {
    if (deck) {
      deck.createSlide(slideId, props.nrOfSteps);
    }
  }, [deck, slideId]);

  const slide = deck?.getSlide(slideId) ?? undefined;
  if (!slide) {
    return null;
  }

  if (!slide.isCurrent) {
    return null;
  }

  return (
    <SlideContext.Provider value={slide}>
      <div className={cn('Slide', L.col.banner(), props.className)}>
        {props.children}
      </div>
    </SlideContext.Provider>
  );
});
