import { useScript } from '/src/script/hooks/useScript';

export type PropsT = React.PropsWithChildren<{
  id: string;
}>;

export const Step = (props: PropsT) => {
  const script = useScript();
  console.log(
    `Id: ${props.id}. Step: ${script.step}}. Steps: ${script.rootScene.steps}`
  );

  if (!script.isVisible(props.id)) {
    return null;
  }

  return <>{props.children}</>;
};
