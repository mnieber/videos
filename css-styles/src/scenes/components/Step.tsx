import { observer } from 'mobx-react-lite';
import { Speak } from '/src/scenes/components/Speak';
import { useScript } from '/src/script/hooks/useScript';

export type PropsT = React.PropsWithChildren<{
  id: string;
  audio?: string;
}>;

export const Step = observer((props: PropsT) => {
  const script = useScript();
  console.log(
    `Id: ${props.id}. Step: ${script.step}}. Steps: ${script.rootScene.steps}`
  );

  if (!script.isVisible(props.id)) {
    return null;
  }

  const audioDiv = <Speak>{props.audio}</Speak>;

  return (
    <>
      {props.audio ? audioDiv : null}
      {props.children}
    </>
  );
});
