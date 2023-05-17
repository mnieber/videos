import { action, computed, makeObservable, observable } from 'mobx';
import { SlideModel } from '/src/slides/models/SlideModel';

export class StepModel {
  @observable pos: number;
  @observable preview: boolean = false;
  @observable hasView: boolean = false;
  slideModel: SlideModel;

  constructor(slideModel: SlideModel, pos: number) {
    makeObservable(this);
    this.pos = pos;
    this.slideModel = slideModel;
  }

  @computed get isCurrent() {
    return this.slideModel.currentStepPos === this.pos;
  }

  @computed get isPresent() {
    return this.slideModel.isCurrent && this.slideModel.isStepPresent(this.pos);
  }

  @action setViewStatus(hasView: boolean) {
    this.hasView = hasView;
  }

  @computed get isPreviewed() {
    return this.preview && !this.isPresent;
  }
}
