import { observer } from 'mobx-react-lite';
import { dps, withDefaultProps } from '/src/app/defaultProps';

export type PropsT = {
  className?: any;
};

const DefaultProps = {
  ...dps.script,
};

export const SceneView = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const scene = props.script.scenes[0];

    return (
      <p className="read-the-docs">{`There are ${scene.steps.length} steps`}</p>
    );
  }, DefaultProps)
);
