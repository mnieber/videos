import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStepModel } from '/src/steps/hooks/useStepModel';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

export const Bullet = observer((props: PropsT) => {
  const step = useStepModel();

  return (
    <div
      className={cn(
        'Bullet',
        props.className,
        step.isPreviewed && 'text-blue-300'
      )}
    >
      {props.children}
    </div>
  );
});
