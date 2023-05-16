import React from 'react';
import { Slide } from '/src/slides/models/Slide';

export const SlideContext = React.createContext<Slide | null>(null);

export const useSlide = () => {
  const slide = React.useContext(SlideContext);

  if (!slide) {
    throw new Error(`No slide in context.`);
  }

  return slide;
};
