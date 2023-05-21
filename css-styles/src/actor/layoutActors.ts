import * as R from 'ramda';
import { ActorT } from '/src/actor/Actor';
import { Container } from '/src/actor/container';
import { deepCopy } from '/src/utils/deepCopy';

type DirectionT = 'row' | 'col';
type JustifyContentT =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItemsT = 'start' | 'end' | 'center' | 'stretch';

type OptionsT = {
  justifyContent?: JustifyContentT;
  alignItems?: AlignItemsT;
  gap?: number;
};

export const layoutActors = (
  container: Container,
  actors: ActorT[],
  direction?: DirectionT,
  options?: OptionsT
): { [key: string]: ActorT } => {
  actors = deepCopy(actors);
  options = options ?? {};

  // Delegate the positioning of actors to private methods
  if (options.justifyContent || options.alignItems) {
    if (direction === 'row') {
      _positionActorsRow(container, actors);

      if (!R.isNil(options.justifyContent)) {
        _justifyContentRow(
          container,
          actors,
          options.justifyContent,
          options.gap ?? 0
        );
      }
      if (!R.isNil(options.alignItems)) {
        _alignItemsRow(container, actors, options.alignItems);
      }
    } else if (direction === 'col') {
      _positionActorsCol(container, actors);

      if (!R.isNil(options.justifyContent)) {
        _justifyContentCol(
          container,
          actors,
          options.justifyContent,
          options.gap ?? 0
        );
      }
      if (!R.isNil(options.alignItems)) {
        _alignItemsCol(container, actors, options.alignItems);
      }
    }
  }
  return R.indexBy(R.prop('name'), actors);
};

function _positionActorsRow(container: Container, actors: ActorT[]) {
  let totalWidth = 0;
  for (const actor of actors) {
    actor.x = totalWidth;
    totalWidth += actor.width;
  }
}

function _positionActorsCol(container: Container, actors: ActorT[]) {
  let totalHeight = 0;
  for (const actor of actors) {
    actor.y = totalHeight;
    totalHeight += actor.height;
  }
}

function _justifyContentRow(
  container: Container,
  actors: ActorT[],
  justifyContent: JustifyContentT,
  gap: number
) {
  let totalWidth = actors.reduce((acc, actor) => acc + actor.width, 0);
  let remainingSpace = container.width - totalWidth - gap * (actors.length - 1);

  // Add gap between all actors
  for (let i = 0; i < actors.length; i++) {
    actors[i].x += i * gap;
  }

  switch (justifyContent) {
    case 'start':
      // Actors are already at the start with gaps. No further action needed.
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
      if (actors.length > 1) {
        let space = remainingSpace / (actors.length - 1);
        for (let i = 0; i < actors.length; i++) {
          actors[i].x += i * space;
        }
      }
      break;
    case 'space-around':
      let spacePerSide = remainingSpace / (2 * actors.length);
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
  container: Container,
  actors: ActorT[],
  justifyContent: JustifyContentT,
  gap: number
) {
  let totalHeight = actors.reduce((acc, actor) => acc + actor.height, 0);
  let remainingSpace =
    container.height - totalHeight - gap * (actors.length - 1);

  // Add gap between all actors
  for (let i = 0; i < actors.length; i++) {
    actors[i].y += i * gap;
  }

  switch (justifyContent) {
    case 'start':
      // Actors are already at the start with gaps. No further action needed.
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
      if (actors.length > 1) {
        let space = remainingSpace / (actors.length - 1);
        for (let i = 0; i < actors.length; i++) {
          actors[i].y += i * space;
        }
      }
      break;
    case 'space-around':
      let spacePerSide = remainingSpace / (2 * actors.length);
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
  container: Container,
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
  container: Container,
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
