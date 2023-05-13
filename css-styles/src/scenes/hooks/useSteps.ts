import { useScript } from '/src/script/hooks/useScript';

export const useSteps = (id: string) => {
  const script = useScript();
  let counter = 0;

  const create = () => {
    counter++;
    const stepId = `${id}-${counter}`;
    script.addStep(stepId);
    return stepId;
  };

  return { create };
};
