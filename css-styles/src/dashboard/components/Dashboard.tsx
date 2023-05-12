import { Bullets } from '/src/scenes/components/Bullets';
import { SceneView } from '/src/scenes/components/SceneView';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

export const Dashboard = (props: PropsT) => {
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
      <Bullets
        id="try"
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
