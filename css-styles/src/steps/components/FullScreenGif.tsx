import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { useStepModel } from '/src/steps/hooks/useStepModel';

export type PropsT = {
  id: string;
  gifUrl: string;
  className?: any;
};

const DefaultProps = {};

export const FullScreenGif = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const step = useStepModel();
    if (!step.isCurrent) {
      return null;
    }
    return null;
  }, DefaultProps)
);
