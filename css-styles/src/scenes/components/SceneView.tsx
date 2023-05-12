import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { useScript } from '/src/script/hooks/useScript';
import { ignore } from '/src/utils/ignore';

export type PropsT = {
  className?: any;
};

const DefaultProps = {};

export const SceneView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    ignore(props);

    const script = useScript();
    const scene = script.rootScene;

    return (
      <p className="read-the-docs">{`There are ${scene.steps.length} steps. At step ${script.step}`}</p>
    );
  }, DefaultProps)
);
