import { observer } from 'mobx-react-lite';
import { Flipped } from 'react-flip-toolkit';
import { actorClassName, ActorT } from '/src/actor/Actor';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  actor: ActorT;
  className?: any;
};

export const ActorDiv = observer((props: PropsT) => {
  const { actor, ...rest } = props;

  const style = {
    left: `${actor.x}px`,
    top: `${actor.y}px`,
    height: `${actor.height}px`,
    width: `${actor.width}px`,
  };

  return (
    <Flipped flipId={actor.name}>
      <div
        className={cn(actorClassName(actor), 'absolute', props.className)}
        style={style}
        {...rest}
      >
        {actor.child}
      </div>
    </Flipped>
  );
});
