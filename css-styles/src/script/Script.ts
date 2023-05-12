import { action, computed, makeObservable, observable } from 'mobx';
import { Scene } from 'src/scenes/Scene';
import { createScene } from '/src/scenes/Scene';

export class Script {
  @observable rootScene: Scene = createScene();
  @observable stepNr: number = 0;

  @action addStep(id: string) {
    if (!this.rootScene.steps.includes(id)) {
      this.rootScene.steps.push(id);
    }
  }

  @action bumpStep() {
    this.stepNr += 1;
  }

  @computed step() {
    return this.rootScene.steps[this.stepNr];
  }

  isVisible(id: string) {
    return this.stepNr > this.rootScene.steps.indexOf(id);
  }

  constructor() {
    makeObservable(this);
  }
}
