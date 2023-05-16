import React from 'react';
import { Step } from '/src/steps/models/Step';

export const StepContext = React.createContext<Step | null>(null);

export const useStep = () => {
  const step = React.useContext(StepContext);

  if (!step) {
    throw new Error(`No step in context.`);
  }

  return step;
};
