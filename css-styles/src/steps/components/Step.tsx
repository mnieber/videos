import { observer } from 'mobx-react-lite';
import React from 'react';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { StepContext } from '/src/steps/hooks/useStepModel';

// Import styles
import './Step.scss';

export type PropsT = React.PropsWithChildren<{
  pos: number;
}>;

export const Step = observer((props: PropsT) => {
  const slide = useSlideModel();

  React.useEffect(() => {
    if (slide) {
      slide.createStep(props.pos);
    }
  }, [slide, props.pos]);

  if (!slide) {
    throw new Error('Step must be used within a Slide');
  }

  const step = slide.getStep(props.pos);
  if (!step) {
    return null;
  }

  if (!step.isPresent && !step.isPreviewed) {
    return null;
  }

  return (
    <StepContext.Provider value={step}>{props.children}</StepContext.Provider>
  );
});
