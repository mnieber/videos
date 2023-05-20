import { observer } from 'mobx-react-lite';
import React from 'react';
import { acn, ActorT } from '/src/actor/Actor';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{
  actor: ActorT;
  pick: string[];
  className?: any;
}>;

export const ActorDiv = observer((props: PropsT) => {
  const { actor, pick, children, ...rest } = props;

  const style = {
    left: `${actor.x}px`,
    top: `${actor.y}px`,
    height: `${actor.height}px`,
    width: `${actor.width}px`,
  };

  return (
    <div
      className={cn(acn(actor, ...pick), props.className)}
      style={style}
      {...rest}
    >
      {props.children}
    </div>
  );
});
