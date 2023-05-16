import { action, computed, makeObservable, observable } from 'mobx';
import { SlideModel } from '/src/slides/models/SlideModel';

export class StepModel {
  @observable id: string;
  @observable preview: boolean = false;
  @observable hasView: boolean = false;
  slideModel: SlideModel;

  constructor(slideModel: SlideModel, id: string) {
    makeObservable(this);
    this.id = id;
    this.slideModel = slideModel;
  }

  @computed get isCurrent() {
    return this.slideModel.currentStepId === this.id;
  }

  @computed get isPresent() {
    return this.slideModel.isCurrent && this.slideModel.isStepPresent(this.id);
  }

  @action setViewStatus(hasView: boolean) {
    this.hasView = hasView;
  }

  @computed get isPreviewed() {
    return this.preview && !this.isPresent;
  }
}
