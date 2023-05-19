import { observer } from 'mobx-react-lite';
import React from 'react';
import { Flipper } from 'react-flip-toolkit';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{ className?: any }>;

export const StepFlipper = observer((props: PropsT) => {
  const slideModel = useSlideModel();
  console.log('step to ', slideModel.currentStepPos);

  return (
    <Flipper
      flipKey={slideModel.currentStepPos}
      className={cn('StepFlipper', props.className)}
    >
      {props.children}
    </Flipper>
  );
});
