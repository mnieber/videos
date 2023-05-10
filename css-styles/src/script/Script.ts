import { action, observable } from 'mobx';
import { Scene } from 'src/scenes/Scene';
import { createScene } from '/src/scenes/Scene';

export class Script {
  @observable rootScene: Scene = createScene();
  @observable step: number = 0;

  @action addStep(id: string) {
    this.rootScene.steps.push(id);
  }

  @action bumpStep() {
    this.step += 1;
  }

  isVisible(id: string) {
    return this.rootScene.steps.indexOf(id) >= this.step;
  }

  constructor() {}
}
