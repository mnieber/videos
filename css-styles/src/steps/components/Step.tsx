import { observer } from 'mobx-react-lite';
import React from 'react';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { StepContext } from '/src/steps/hooks/useStepModel';

// Import styles
import './Step.scss';

export type PropsT = React.PropsWithChildren<{
  id: string;
}>;

export const Step = observer((props: PropsT) => {
  const slide = useSlideModel();
  const stepId = `${slide.id}-step-${props.id}`;

  React.useEffect(() => {
    if (slide) {
      slide.createStep(stepId);
    }
  }, [slide, stepId]);

  if (!slide) {
    throw new Error('Step must be used within a Slide');
  }

  const step = slide.getStep(stepId);
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
