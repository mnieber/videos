import { Bullets } from '/src/scenes/components/Bullets';
import { SceneView } from '/src/scenes/components/SceneView';
import { useSteps } from '/src/scenes/hooks/useSteps';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

export const Dashboard = (props: PropsT) => {
  const steps = useSteps('App');

  return (
    <div
      className={cn(
        'Dashboard',
        'bg-blue-600',
        //
        //
        'w-[1920px] h-[1080px]',
        props.className
      )}
      tabIndex={0}
    >
      <SceneView />
      <Bullets stepId={steps.create()} bullets={[["Let's go"], ['Come on']]} />
      <Bullets
        stepId={steps.create()}
        bullets={[
          [
            'Vite is a new build tool for modern web development',
            [
              //
              'Vite is fast',
              'Vite is extensible',
            ],
          ],
        ]}
      />
      <Bullets
        stepId={steps.create()}
        bullets={[['You can be quick']]}
        audio="Welcome to vite"
      />
    </div>
  );
};
