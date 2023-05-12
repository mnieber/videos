import { observer } from 'mobx-react-lite';
import { useScript } from '/src/script/hooks/useScript';

export type PropsT = React.PropsWithChildren<{
  id: string;
}>;

export const Step = observer((props: PropsT) => {
  const script = useScript();
  console.log(
    `Id: ${props.id}. Step: ${script.step}}. Steps: ${script.rootScene.steps}`
  );

  if (!script.isVisible(props.id)) {
    return null;
  }

  return <>{props.children}</>;
});
