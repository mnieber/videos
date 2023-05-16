import React from 'react';
import { StepModel } from '/src/steps/models/StepModel';

export const StepContext = React.createContext<StepModel | null>(null);

export const useStepModel = () => {
  const step = React.useContext(StepContext);

  if (!step) {
    throw new Error(`No step in context.`);
  }

  return step;
};
