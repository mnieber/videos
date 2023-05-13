import { observer } from 'mobx-react-lite';
import { Speak } from '/src/scenes/components/Speak';
import { useScript } from '/src/script/hooks/useScript';

export type PropsT = React.PropsWithChildren<{
  stepId: string;
  audio?: string;
  gif?: string;
}>;

export const Step = observer((props: PropsT) => {
  const script = useScript();
  if (!script.isVisible(props.stepId)) {
    return null;
  }

  const audioDiv =
    props.audio && script.isVisible(props.stepId) ? (
      <Speak>{props.audio}</Speak>
    ) : null;

  const gifDiv =
    props.gif && script.isAtStep(props.stepId) ? <div></div> : null;

  return (
    <>
      {audioDiv}
      {gifDiv}
      {props.children}
    </>
  );
});
