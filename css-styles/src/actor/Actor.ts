import * as R from 'ramda';
import { cn } from '/src/utils/classnames';
import { ObjT } from '/src/utils/types';

export type ActorT = {
  child?: React.ReactElement;
  height: number;
  pickStyles: string[];
  styles: ObjT;
  name: string;
  visible: boolean;
  width: number;
  x: number;
  y: number;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const createActor = (
  props: Optional<ActorT, 'x' | 'y' | 'styles' | 'visible' | 'pickStyles'>
) => {
  return {
    child: props.child,
    height: props.height,
    styles: props.styles ?? {},
    pickStyles: props.pickStyles ?? [],
    name: props.name,
    visible: props.visible ?? true,
    width: props.width,
    x: props.x ?? 0,
    y: props.y ?? 0,
  };
};

export const actorClassName = (actor: ActorT) => {
  const result: any[] = [actor.name];

  for (const key of actor.pickStyles) {
    const path = key.split('.');
    const style = R.path(path, actor.styles ?? {});
    if (!R.isNil(style)) {
      result.push(style);
    }
  }

  return cn(result);
};

export const copyActor = (actor: ActorT) => {
  return {
    ...actor,
  };
};
