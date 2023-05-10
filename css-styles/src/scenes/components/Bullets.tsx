import { observer } from 'mobx-react-lite';
import { withDefaultProps } from '/src/app/defaultProps';
import { useScript } from '/src/script/hooks/useScript';
import { ignore } from '/src/utils/ignore';

export type PropsT = {
  points: string[];
};

const DefaultProps = {};

export const Bullets = observer(
  withDefaultProps((props: PropsT & typeof DefaultProps) => {
    const script = useScript();
    const scene = script.rootScene;

    ignore(props, scene);
    return <p className="read-the-docs">{`Some bullets`}</p>;
  }, DefaultProps)
);
