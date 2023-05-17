import { computed, makeObservable, observable } from 'mobx';
import { SlideModel } from '/src/slides/models/SlideModel';

export class StepModel {
  @observable pos: number;
  @observable preview: boolean = false;
  slideModel: SlideModel;

  constructor(slideModel: SlideModel, pos: number, preview?: boolean) {
    makeObservable(this);
    this.pos = pos;
    this.preview = preview ?? false;
    this.slideModel = slideModel;
  }

  @computed get isCurrent() {
    return this.slideModel.currentStepPos === this.pos;
  }

  @computed get isPresent() {
    return this.slideModel.isCurrent && this.slideModel.isStepPresent(this.pos);
  }

  @computed get isPreviewed() {
    return this.preview && !this.isPresent;
  }
}
