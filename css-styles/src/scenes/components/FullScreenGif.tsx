import { observer } from 'mobx-react-lite';
import React from 'react';
import { withDefaultProps } from '/src/app/defaultProps';
import { useScript } from '/src/script/hooks/useScript';

export type PropsT = {
  stepId: string;
  gifUrl: string;
  className?: any;
};

const DefaultProps = {};

export const FullScreenGif = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const script = useScript();
    const isAtStep = script.isAtStep(props.stepId);
    const isVisible = script.isVisible(props.stepId);

    React.useEffect(() => {
      if (isAtStep) {
        script.pushGif(props.gifUrl);
      } else if (isVisible) {
        script.popGif(props.gifUrl);
      }
    }, [isAtStep, isVisible]);

    return null;
  }, DefaultProps)
);
