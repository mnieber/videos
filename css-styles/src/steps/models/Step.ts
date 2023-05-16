import { action, computed, makeObservable, observable } from 'mobx';
import { Slide } from '/src/slides/models/Slide';

export class Step {
  @observable id: string;
  @observable preview: boolean = false;
  @observable hasView: boolean = false;
  @observable isTriggered: boolean = false;
  slide: Slide;

  constructor(slide: Slide, id: string) {
    makeObservable(this);
    this.id = id;
    this.slide = slide;
  }

  @computed get isCurrent() {
    return this.slide.currentStepId === this.id;
  }

  @action trigger() {
    this.isTriggered = true;
  }

  @action setViewStatus(hasView: boolean) {
    this.hasView = hasView;
  }

  @computed get isPreviewed() {
    return this.preview && !this.isTriggered;
  }
}
