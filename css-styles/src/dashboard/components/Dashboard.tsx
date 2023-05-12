import { Bullets } from '/src/scenes/components/Bullets';
import { SceneView } from '/src/scenes/components/SceneView';
import { Step } from '/src/scenes/components/Step';
import { useSteps } from '/src/scenes/hooks/useSteps';
import { cn } from '/src/utils/classnames';

export const Dashboard = () => {
  const steps = useSteps('App');

  return (
    <div className={cn('Dashboard')} tabIndex={0}>
      <h1>App</h1>
      <Step id={steps.create()}>
        <div>Hello</div>
      </Step>
      <Step id={steps.create()} audioUrl="/samples/test-sample.mp3">
        <div>Friend</div>
      </Step>
      <SceneView />
      <Bullets
        points={[
          'Vite is a new build tool for modern web development',
          'Vite is fast',
          'Vite is extensible',
        ]}
      />
    </div>
  );
};
