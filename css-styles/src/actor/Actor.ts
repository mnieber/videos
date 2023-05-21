import * as R from 'ramda';
import { cn } from '/src/utils/classnames';
import { ObjT } from '/src/utils/types';

export type ActorT = {
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  layout: ObjT;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const createActor = (props: Optional<ActorT, 'x' | 'y' | 'layout'>) => {
  return {
    name: props.name,
    x: props.x ?? 0,
    y: props.y ?? 0,
    width: props.width,
    height: props.height,
    layout: props.layout ?? {},
  };
};

export const acn = (actor: ActorT, ...keys: string[]) => {
  const result: any[] = [actor.name];

  for (const key of keys) {
    const path = key.split('.');
    const style = R.path(path, actor.layout ?? {});
    if (!R.isNil(style)) {
      result.push(style);
    }
  }

  return cn(result);
};

export const copyActor = (actor: ActorT) => {
  const copy = R.clone(actor);
  return copy;
};
