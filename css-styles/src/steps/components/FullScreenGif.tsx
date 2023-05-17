import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { useStepModel } from '/src/steps/hooks/useStepModel';
import { ModalOverlay } from '/src/utils/components/ModalOverlay';

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
    return (
      <ModalOverlay>
        <img src={props.gifUrl} />
      </ModalOverlay>
    );
  }, DefaultProps)
);
