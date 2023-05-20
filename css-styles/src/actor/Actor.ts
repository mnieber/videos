import { action, makeObservable, observable } from 'mobx';
import * as R from 'ramda';

type Direction = 'row' | 'col';
type JustifyContent =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItems = 'start' | 'end' | 'center' | 'stretch';

export class Actor {
  @observable x: number;
  @observable y: number;
  @observable width: number;
  @observable height: number;

  constructor(x: number, y: number, width: number, height: number) {
    makeObservable(this);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export const flex = action(
  (
    container: Actor,
    actors: Actor[],
    direction: Direction,
    justifyContent?: JustifyContent,
    alignItems?: AlignItems
  ) => {
    // Delegate the positioning of actors to private methods
    if (direction === 'row') {
      _positionActorsRow(container, actors);
      if (!R.isNil(justifyContent)) {
        _justifyContentRow(container, actors, justifyContent);
      }
      if (!R.isNil(alignItems)) {
        _alignItemsRow(container, actors, alignItems);
      }
    } else {
      // direction is 'col'
      _positionActorsCol(container, actors);
      if (!R.isNil(justifyContent)) {
        _justifyContentCol(container, actors, justifyContent);
      }
      if (!R.isNil(alignItems)) {
        _alignItemsCol(container, actors, alignItems);
      }
    }
  }
);

function _positionActorsRow(container: Actor, actors: Actor[]) {
  let totalWidth = 0;
  for (const actor of actors) {
    actor.x = totalWidth;
    totalWidth += actor.width;
  }
}

function _positionActorsCol(container: Actor, actors: Actor[]) {
  let totalHeight = 0;
  for (const actor of actors) {
    actor.y = totalHeight;
    totalHeight += actor.height;
  }
}

function _justifyContentRow(
  container: Actor,
  actors: Actor[],
  justifyContent: JustifyContent
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
  container: Actor,
  actors: Actor[],
  justifyContent: JustifyContent
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
  container: Actor,
  actors: Actor[],
  alignItems: AlignItems
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
  container: Actor,
  actors: Actor[],
  alignItems: AlignItems
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
