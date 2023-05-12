import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import myGif from '/src/gif/test.gif';
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
      <p className="read-the-docs">
        <img src={myGif} alt="my-gif" />
        {`There are ${scene.steps.length} steps. At stepNr ${script.stepNr}`}
      </p>
    );
  }, DefaultProps)
);
