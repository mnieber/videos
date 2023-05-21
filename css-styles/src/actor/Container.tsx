import * as R from 'ramda';
import React from 'react';
import { ActorT, copyActor } from '/src/actor/Actor';
import { ActorDiv } from '/src/actor/components/ActorDiv';
import { updateActor } from '/src/actor/updateActor';
import { ObjT } from '/src/utils/types';

export type PropsT = {
  width: number;
  height: number;
  layout: React.ReactElement;
  actors?: { [key: string]: ActorT };
};

export class Container {
  width: number;
  height: number;
  actors: { [key: string]: ActorT };
  layout: React.ReactElement;

  copy() {
    return new Container({
      width: this.width,
      height: this.height,
      actors: R.mapObjIndexed((actor, name, actors) => {
        return { ...copyActor(actor), name: name };
      }, this.actors),
      layout: this.layout,
    });
  }

  update(updates: ObjT) {
    Object.entries(updates).forEach(([key, value]) => {
      updateActor(this.actors[key], value);
    });
  }

  constructor(props: PropsT) {
    this.width = props.width;
    this.height = props.height;
    this.actors = props.actors ?? {};
    this.layout = props.layout;
  }
}

export const createDiv = (container: Container) => {
  return React.cloneElement(container.layout, {
    children: Object.values(container.actors)
      .filter((actor) => actor.visible)
      .map((actor) => {
        return <ActorDiv actor={actor} key={actor.name} />;
      }),
  });
};
