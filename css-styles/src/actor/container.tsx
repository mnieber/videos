import { ActorT } from '/src/actor/Actor';
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
      actors: this.actors,
      layout: this.layout,
    });
  }

  update(updates: ObjT) {}

  constructor(props: PropsT) {
    this.width = props.width;
    this.height = props.height;
    this.actors = props.actors ?? {};
    this.layout = props.layout;
  }
}

export const createDiv = (container: Container) => {
  return <div></div>;
};
