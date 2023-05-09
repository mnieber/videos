export class Scene {
  steps: string[] = [];
  constructor() {}
}

export const createScene = (): Scene => {
  const scene = new Scene();
  scene.steps = ['step1', 'step2', 'step3'];
  return scene;
};
