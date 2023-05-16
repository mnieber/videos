import React from 'react';
import { SlideModel } from '/src/slides/models/SlideModel';

export const SlideContext = React.createContext<SlideModel | null>(null);

export const useSlideModel = () => {
  const slide = React.useContext(SlideContext);

  if (!slide) {
    throw new Error(`No slide in context.`);
  }

  return slide;
};
