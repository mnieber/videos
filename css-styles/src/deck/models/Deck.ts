import { action, computed, makeObservable, observable } from 'mobx';
import { Slide } from '/src/slides/models/Slide';

export class Deck {
  @observable slides: Slide[] = [];
  @observable currentSlideId: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @computed get currentSlide(): Slide | undefined {
    return this.slides.find((slide) => slide.id === this.currentSlideId);
  }

  @action getOrCreateSlide(id: string): Slide {
    let slide = this.slides.find((slide) => slide.id === id);

    if (!slide) {
      slide = new Slide(this, id);
      this.slides.push(slide);
    }

    return slide;
  }

  @action setCurrentSlide(id: string) {
    this.currentSlideId = id;
  }

  @action goToNextSlide() {
    const currentIndex = this.slides.findIndex(
      (slide) => slide.id === this.currentSlideId
    );
    if (currentIndex < this.slides.length - 1) {
      this.setCurrentSlide(this.slides[currentIndex + 1].id);
    }
  }

  @action goToPreviousSlide() {
    const currentIndex = this.slides.findIndex(
      (slide) => slide.id === this.currentSlideId
    );
    if (currentIndex > 0) {
      this.setCurrentSlide(this.slides[currentIndex - 1].id);
    }
  }

  @action goToFirstSlide() {
    if (this.slides.length > 0) {
      this.setCurrentSlide(this.slides[0].id);
    }
  }

  @action goToLastSlide() {
    if (this.slides.length > 0) {
      this.setCurrentSlide(this.slides[this.slides.length - 1].id);
    }
  }
}
