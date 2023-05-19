import { action, computed, makeObservable, observable } from 'mobx';
import { DeckModel } from '/src/deck/models/DeckModel';

export class SlideModel {
  @observable id: string;
  @observable currentStepIndex: number;
  @observable nrOfSteps: number = 0;
  deckModel: DeckModel;

  constructor(deckModel: DeckModel, id: string, nrOfSteps: number) {
    makeObservable(this);
    this.id = id;
    this.deckModel = deckModel;
    this.nrOfSteps = nrOfSteps;
    this.currentStepIndex = nrOfSteps > 0 ? 0 : -1;
  }

  @computed get isCurrent() {
    return this.deckModel.currentSlideId === this.id;
  }

  @action.bound goToNextStep() {
    if (this.currentStepIndex >= this.nrOfSteps - 1) {
      return false;
    }

    this.currentStepIndex = this.currentStepIndex + 1;
    return true;
  }

  @action.bound goToPreviousStep() {
    if (this.currentStepIndex <= 0) {
      return false;
    }

    this.currentStepIndex = this.currentStepIndex - 1;
    return true;
  }
}
