import { observer } from 'mobx-react-lite';
import { Bullets } from '/src/scenes/components/Bullets';
import { FullScreenGif } from '/src/scenes/components/FullScreenGif';
import { useSteps } from '/src/scenes/hooks/useSteps';
import { useScript } from '/src/script/hooks/useScript';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

export const Dashboard = observer((props: PropsT) => {
  const steps = useSteps('App');
  const script = useScript();

  console.log('script.gifUrl', script.gifUrl);
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
      {script.gifUrl && <img src={script.gifUrl} />}
      <Bullets stepId={steps.create()} bullets={[["Let's go"], ['Come on']]} />
      <FullScreenGif stepId={steps.create()} gifUrl="/src/gif/test.gif" />
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
});
