import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStep } from '/src/steps/hooks/useStep';
import { Speak } from '/src/utils/components/Speak';

export type PropsT = React.PropsWithChildren<{
  text: string;
  gif?: string;
}>;

export const Audio = observer((props: PropsT) => {
  const step = useStep();

  React.useEffect(() => {
    if (step?.isCurrent) {
    }
  }, [step]);

  if (!step.isCurrent) {
    return null;
  }

  const audioDiv = <Speak>{props.text}</Speak>;
  const gifDiv = props.gif && step.isCurrent ? <div></div> : null;

  return (
    <>
      {audioDiv}
      {gifDiv}
      {props.children}
    </>
  );
});
