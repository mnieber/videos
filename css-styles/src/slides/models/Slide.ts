import { action, computed, makeObservable, observable } from 'mobx';
import { Deck } from '/src/deck/models/Deck';
import { Step } from '/src/steps/models/Step';

export class Slide {
  @observable id: string;
  @observable currentStepId?: string;
  @observable hasView: boolean = false;
  @observable isTriggered: boolean = false;
  @observable steps: Step[] = [];
  deck: Deck;

  constructor(deck: Deck, id: string) {
    makeObservable(this);
    this.id = id;
    this.deck = deck;
  }

  @computed get isCurrent() {
    return this.deck.currentSlideId === this.id;
  }

  @action.bound trigger() {
    this.isTriggered = true;
  }

  @action.bound setViewStatus(hasView: boolean) {
    this.hasView = hasView;
  }

  getStep(id: string) {
    return this.steps.find((step) => step.id === id);
  }

  @action.bound createStep(id: string) {
    if (!this.getStep(id)) {
      this.steps.push(new Step(this, id));
    }
  }
}
