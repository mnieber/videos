import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from '/src/app/defaultProps';
import { useStep } from '/src/steps/hooks/useStep';

export type PropsT = {
  id: string;
  gifUrl: string;
  className?: any;
};

const DefaultProps = {};

export const FullScreenGif = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const step = useStep();
    const isAtStep = step.isCurrent;
    const isVisible = step.isTriggered;

    React.useEffect(() => {
      if (isAtStep) {
        // script.pushGif(props.gifUrl);
      } else if (isVisible) {
        // script.popGif(props.gifUrl);
      }
    }, [isAtStep, isVisible]);

    return null;
  }, DefaultProps)
);
