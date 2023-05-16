import { observer } from 'mobx-react-lite';
import { useStepModel } from '/src/steps/hooks/useStepModel';
import { Speak } from '/src/utils/components/Speak';

export type PropsT = {
  text: string;
  gif?: string;
};

export const Audio = observer((props: PropsT) => {
  const step = useStepModel();
  if (!step.isCurrent) {
    return null;
  }

  return <Speak>{props.text}</Speak>;
});
