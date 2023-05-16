import { action, autorun, computed, makeObservable, observable } from 'mobx';
import * as R from 'ramda';
import { SlideModel } from '/src/slides/models/SlideModel';

export class DeckModel {
  @observable slides: SlideModel[] = [];
  @observable currentSlideId: string | null = null;

  constructor() {
    makeObservable(this);

    autorun(() => {
      console.log('At', this.currentSlideId, this.currentSlide?.currentStepId);
    });
  }

  getSlide(slideId: string): SlideModel | undefined {
    return this.slides.find((slide) => slide.id === slideId);
  }

  @computed get currentSlide(): SlideModel | undefined {
    return this.currentSlideId ? this.getSlide(this.currentSlideId) : undefined;
  }

  @action createSlide(id: string): SlideModel {
    let slide = this.getSlide(id);
    if (slide) {
      return slide;
    }

    console.log('Creating slide', id);
    slide = new SlideModel(this, id);
    this.slides.push(slide);

    if (R.isNil(this.currentSlideId)) {
      this.currentSlideId = id;
    }

    return slide;
  }

  @action goToNextSlide() {
    const currentIndex = this.slides.findIndex(
      (slide) => slide.id === this.currentSlideId
    );
    if (currentIndex < this.slides.length - 1) {
      this.currentSlideId = this.slides[currentIndex + 1].id;
    }
  }

  @action goToPreviousSlide() {
    const currentIndex = this.slides.findIndex(
      (slide) => slide.id === this.currentSlideId
    );
    if (currentIndex > 0) {
      this.currentSlideId = this.slides[currentIndex - 1].id;
    }
  }

  @action goToFirstSlide() {
    if (this.slides.length > 0) {
      this.currentSlideId = this.slides[0].id;
    }
  }

  @action goToLastSlide() {
    if (this.slides.length > 0) {
      this.currentSlideId = this.slides[this.slides.length - 1].id;
    }
  }
}
