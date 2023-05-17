import { action, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { DeckModel } from '/src/deck/models/DeckModel';
import { StepModel } from '/src/steps/models/StepModel';

export class SlideModel {
  @observable id: string;
  @observable currentStepPos?: number;
  @observable _steps: StepModel[] = [];
  deckModel: DeckModel;

  constructor(deckModel: DeckModel, id: string) {
    makeObservable(this);
    this.id = id;
    this.deckModel = deckModel;
  }

  @computed get isCurrent() {
    return this.deckModel.currentSlideId === this.id;
  }

  @computed get steps() {
    return R.sort((a, b) => {
      return a.pos - b.pos;
    }, this._steps);
  }

  getStep(pos: number) {
    return this._steps.find((step) => step.pos === pos);
  }

  @action.bound createStep(pos: number, preview?: boolean) {
    let step = this.getStep(pos);
    if (step) {
      return step;
    }
    step = new StepModel(this, pos, preview);
    this._steps.push(step);

    if (R.isNil(this.currentStepPos)) {
      this.currentStepPos = pos;
    }

    return step;
  }

  @computed get currentStepIndex() {
    return this._steps.findIndex((step) => step.pos === this.currentStepPos);
  }

  @action.bound goToNextStep() {
    const currentIndex = this.currentStepIndex;
    if (currentIndex < this.steps.length - 1) {
      this.currentStepPos = this.steps[currentIndex + 1].pos;
      return true;
    }
    return false;
  }

  @action.bound goToPreviousStep() {
    const currentIndex = this.currentStepIndex;
    if (currentIndex > 0) {
      this.currentStepPos = this.steps[currentIndex - 1].pos;
      return true;
    }
    return false;
  }

  @computed get stepPositions() {
    return this.steps.map((step) => step.pos);
  }

  isStepPresent(pos: number) {
    return (
      !R.isNil(this.currentStepPos) &&
      this.stepPositions.indexOf(pos) <=
        this.stepPositions.indexOf(this.currentStepPos)
    );
  }
}
