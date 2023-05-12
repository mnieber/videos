import { Bullets } from '/src/scenes/components/Bullets';
import { SceneView } from '/src/scenes/components/SceneView';
import { useSteps } from '/src/scenes/hooks/useSteps';
import { cn } from '/src/utils/classnames';

export const Dashboard = () => {
  const steps = useSteps('App');

  return (
    <div className={cn('Dashboard')} tabIndex={0}>
      <h1>App</h1>
      <SceneView />
      <Bullets
        id="vite"
        content={[
          {
            bullets: [
              [
                'Vite is a new build tool for modern web development',
                [
                  //
                  'Vite is fast',
                  'Vite is extensible',
                ],
              ],
            ],
          },
          {
            audio: 'Welcome to vite',
            bullets: [['You can be quick']],
          },
        ]}
      />
    </div>
  );
};
