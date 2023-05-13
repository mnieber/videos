import { action, computed, makeObservable, observable } from 'mobx';
import { Scene } from 'src/scenes/Scene';
import { createScene } from '/src/scenes/Scene';

export class Script {
  @observable rootScene: Scene = createScene();
  @observable stepNr: number = 0;
  @observable gifUrls: string[] = [];

  @action addStep(id: string) {
    if (!this.rootScene.steps.includes(id)) {
      this.rootScene.steps.push(id);
    }
  }

  @action bumpStep() {
    this.stepNr += 1;
  }

  @action pushGif(gifUrl: string) {
    if (!this.gifUrls.includes(gifUrl)) {
      this.gifUrls.push(gifUrl);
    }
  }

  @action popGif(gifUrl: string) {
    this.gifUrls = this.gifUrls.filter((x) => x !== gifUrl);
  }

  @computed get step() {
    return this.rootScene.steps[this.stepNr];
  }

  @computed get gifUrl() {
    return this.gifUrls[this.gifUrls.length - 1];
  }

  isVisible(id: string) {
    return this.stepNr >= this.rootScene.steps.indexOf(id) + 1;
  }

  isAtStep(id: string) {
    console.log(
      this.stepNr,
      this.rootScene.steps,
      this.rootScene.steps.indexOf(id)
    );
    return this.stepNr === this.rootScene.steps.indexOf(id) + 1;
  }

  constructor() {
    makeObservable(this);
  }
}
