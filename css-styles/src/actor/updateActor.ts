import { ActorT } from '/src/actor/Actor';

export type PropsT = {
  dx?: number;
  dy?: number;
  posFrom?: ActorT;
  child?: React.ReactElement;
  pickStyles?: string[];
  visible?: boolean;
};

export const updateActor = (actor: ActorT, props: PropsT) => {
  if (props.dx) {
    actor.x += props.dx;
  }
  if (props.dy) {
    actor.y += props.dy;
  }
  if (props.posFrom) {
    actor.x = props.posFrom.x;
    actor.y = props.posFrom.y;
  }
  if (props.child) {
    actor.child = props.child;
  }
  if (props.pickStyles) {
    actor.pickStyles = props.pickStyles;
  }
  if (props.visible !== undefined) {
    actor.visible = props.visible;
  }
};
