export class Scene {
  steps: string[] = [];
  constructor() {}
}

export const createScene = (): Scene => {
  const scene = new Scene();
  return scene;
};
