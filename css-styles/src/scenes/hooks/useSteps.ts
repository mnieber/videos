import React from 'react';
import { useScript } from '/src/script/hooks/useScript';

export const useSteps = (id: string) => {
  const script = useScript();
  const currentRef = React.useRef(0);

  const create = () => {
    currentRef.current++;
    const stepId = `${id}-${currentRef.current}`;
    script.addStep(stepId);
    return stepId;
  };

  return { create };
};
