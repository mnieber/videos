import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { DeckModel } from '/src/deck/models/DeckModel';
import { StepModel } from '/src/steps/models/StepModel';

export class SlideModel {
  @observable id: string;
  @observable currentStepId?: string;
  @observable hasView: boolean = false;
  @observable steps: StepModel[] = [];
  deckModel: DeckModel;

  constructor(deckModel: DeckModel, id: string) {
    makeObservable(this);
    this.id = id;
    this.deckModel = deckModel;
  }

  @computed get isCurrent() {
    return this.deckModel.currentSlideId === this.id;
  }

  @action.bound setViewStatus(hasView: boolean) {
    this.hasView = hasView;
  }

  getStep(id: string) {
    return this.steps.find((step) => step.id === id);
  }

  @action.bound createStep(id: string) {
    let step = this.getStep(id);
    if (step) {
      return step;
    }
    step = new StepModel(this, id);
    this.steps.push(step);

    if (R.isNil(this.currentStepId)) {
      this.currentStepId = id;
    }

    return step;
  }

  @computed get stepIds() {
    return this.steps.map((step) => step.id);
  }

  isStepPresent(id: string) {
    return (
      !R.isNil(this.currentStepId) &&
      this.stepIds.indexOf(id) <= this.stepIds.indexOf(this.currentStepId)
    );
  }
}
