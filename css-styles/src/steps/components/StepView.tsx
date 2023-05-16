import { observer } from 'mobx-react-lite';
import React from 'react';
import { useSlide } from '/src/slides/hooks/useSlide';
import { StepContext } from '/src/steps/hooks/useStep';

// Import styles
import './StepView.scss';

export type PropsT = React.PropsWithChildren<{
  id: string;
  className?: string;
}>;

export const StepView = observer((props: PropsT) => {
  const slide = useSlide();

  React.useEffect(() => {
    if (slide) {
      slide.createStep(props.id);
    }
  }, [slide]);

  if (!slide) {
    throw new Error('StepView must be used within a SlideView');
  }

  const step = slide.getStep(props.id);
  if (!step) {
    return null;
  }

  if (!step.isTriggered && !step.isPreviewed) {
    return null;
  }

  return (
    <StepContext.Provider value={step}>
      <div className={props.className}>{props.children}</div>
    </StepContext.Provider>
  );
});
