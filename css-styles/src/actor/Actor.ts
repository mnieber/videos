import * as R from 'ramda';
import { cn } from '/src/utils/classnames';
import { deepCopy } from '/src/utils/deepCopy';
import { ObjT } from '/src/utils/types';

type DirectionT = 'row' | 'col';
type JustifyContentT =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItemsT = 'start' | 'end' | 'center' | 'stretch';

export type ActorT = {
  x: number;
  y: number;
  width: number;
  height: number;
  className?: ObjT;
};

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const createActor = (
  props: Optional<ActorT, 'x' | 'y' | 'className'>
) => {
  return {
    x: props.x ?? 0,
    y: props.y ?? 0,
    width: props.width,
    height: props.height,
    className: props.className,
  };
};

export const flex = (
  container: ActorT,
  actors: ActorT[],
  direction: DirectionT,
  justifyContent?: JustifyContentT,
  alignItems?: AlignItemsT
) => {
  if (!(justifyContent || alignItems)) {
    return;
  }

  actors = deepCopy(actors);

  // Delegate the positioning of actors to private methods
  if (direction === 'row') {
    _positionActorsRow(container, actors);

    if (!R.isNil(justifyContent)) {
      _justifyContentRow(container, actors, justifyContent);
    }
    if (!R.isNil(alignItems)) {
      _alignItemsRow(container, actors, alignItems);
    }
  } else if (direction === 'col') {
    _positionActorsCol(container, actors);

    if (!R.isNil(justifyContent)) {
      _justifyContentCol(container, actors, justifyContent);
    }
    if (!R.isNil(alignItems)) {
      _alignItemsCol(container, actors, alignItems);
    }
  }
};

function _positionActorsRow(container: ActorT, actors: ActorT[]) {
  let totalWidth = 0;
  for (const actor of actors) {
    actor.x = totalWidth;
    totalWidth += actor.width;
  }
}

function _positionActorsCol(container: ActorT, actors: ActorT[]) {
  let totalHeight = 0;
  for (const actor of actors) {
    actor.y = totalHeight;
    totalHeight += actor.height;
  }
}

function _justifyContentRow(
  container: ActorT,
  actors: ActorT[],
  justifyContent: JustifyContentT
) {
  let totalWidth = actors.reduce((acc, actor) => acc + actor.width, 0);
  let remainingSpace = container.width - totalWidth;
  let numSpaces = actors.length - 1;

  switch (justifyContent) {
    case 'start':
      // Actors are already at the start. No action needed.
      break;
    case 'end':
      for (const actor of actors) {
        actor.x += remainingSpace;
      }
      break;
    case 'center':
      for (const actor of actors) {
        actor.x += remainingSpace / 2;
      }
      break;
    case 'space-between':
      let space = numSpaces > 0 ? remainingSpace / numSpaces : 0;
      for (let i = 0; i < actors.length; i++) {
        actors[i].x += i * space;
      }
      break;
    case 'space-around':
      let spacePerSide = numSpaces > 0 ? remainingSpace / numSpaces : 0;
      for (let i = 0; i < actors.length; i++) {
        actors[i].x += i * spacePerSide + spacePerSide / 2;
      }
      break;
    case 'space-evenly':
      let segments = actors.length + 1;
      let segmentSpace = remainingSpace / segments;
      for (let i = 0; i < actors.length; i++) {
        actors[i].x += (i + 1) * segmentSpace;
      }
      break;
  }
}

function _justifyContentCol(
  container: ActorT,
  actors: ActorT[],
  justifyContent: JustifyContentT
) {
  let totalHeight = actors.reduce((acc, actor) => acc + actor.height, 0);
  let remainingSpace = container.height - totalHeight;
  let numSpaces = actors.length - 1;

  switch (justifyContent) {
    case 'start':
      // Actors are already at the start. No action needed.
      break;
    case 'end':
      for (const actor of actors) {
        actor.y += remainingSpace;
      }
      break;
    case 'center':
      for (const actor of actors) {
        actor.y += remainingSpace / 2;
      }
      break;
    case 'space-between':
      let space = numSpaces > 0 ? remainingSpace / numSpaces : 0;
      for (let i = 0; i < actors.length; i++) {
        actors[i].y += i * space;
      }
      break;
    case 'space-around':
      let spacePerSide = numSpaces > 0 ? remainingSpace / numSpaces : 0;
      for (let i = 0; i < actors.length; i++) {
        actors[i].y += i * spacePerSide + spacePerSide / 2;
      }
      break;
    case 'space-evenly':
      let segments = actors.length + 1;
      let segmentSpace = remainingSpace / segments;
      for (let i = 0; i < actors.length; i++) {
        actors[i].y += (i + 1) * segmentSpace;
      }
      break;
  }
}

function _alignItemsRow(
  container: ActorT,
  actors: ActorT[],
  alignItems: AlignItemsT
) {
  switch (alignItems) {
    case 'start':
      for (const actor of actors) {
        actor.y = 0;
      }
      break;
    case 'end':
      for (const actor of actors) {
        actor.y = container.height - actor.height;
      }
      break;
    case 'center':
      for (const actor of actors) {
        actor.y = (container.height - actor.height) / 2;
      }
      break;
    case 'stretch':
      for (const actor of actors) {
        actor.y = 0;
        actor.height = container.height;
      }
      break;
  }
}

function _alignItemsCol(
  container: ActorT,
  actors: ActorT[],
  alignItems: AlignItemsT
) {
  switch (alignItems) {
    case 'start':
      for (const actor of actors) {
        actor.x = 0;
      }
      break;
    case 'end':
      for (const actor of actors) {
        actor.x = container.width - actor.width;
      }
      break;
    case 'center':
      for (const actor of actors) {
        actor.x = (container.width - actor.width) / 2;
      }
      break;
    case 'stretch':
      for (const actor of actors) {
        actor.x = 0;
        actor.width = container.width;
      }
      break;
  }
}

export const acn = (actor: ActorT, ...keys: string[]) => {
  const result: any[] = [
    `h-${actor.height}px`,
    `w-${actor.width}px`,
    `left-${actor.x}px`,
    `top-${actor.y}px`,
  ];

  for (const key of keys) {
    const path = key.split('.');
    const style = R.path(path, actor.className ?? {});
    if (!R.isNil(style)) {
      result.push(style);
    }
  }

  return cn(result);
};
