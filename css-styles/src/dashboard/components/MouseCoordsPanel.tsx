import { observer } from 'mobx-react-lite';
import { useDeckModel } from '/src/deck/hooks/useDeckModel';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

export const MouseCoordsPanel = observer((props: PropsT) => {
  const deckModel = useDeckModel();
  const x = deckModel.mousePos[0];
  const y = deckModel.mousePos[1];

  return (
    <div className={cn('MouseCordsPanel', L.row.banner(), props.className)}>
      {`${x} - ${y}`}
    </div>
  );
});
