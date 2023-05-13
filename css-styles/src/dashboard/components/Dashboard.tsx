import { observer } from 'mobx-react-lite';
import { Bullets } from '/src/scenes/components/Bullets';
import { FullScreenGif } from '/src/scenes/components/FullScreenGif';
import { Step } from '/src/scenes/components/Step';
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
      <Step stepId={steps.create()} audio={'Hello'}>
        <div>One</div>
      </Step>
      {script.gifUrl && <img src={script.gifUrl} />}
      <Step stepId={steps.create()}>
        <Bullets bullets={[["Let's go"], ['Come on']]} />
      </Step>
      <FullScreenGif stepId={steps.create()} gifUrl="/src/gif/test.gif" />
      <Step stepId={steps.create()}>
        <Bullet>
          <Bullet></Bullet>
        </Bullet>
        <Bullets
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
      </Step>
      <Step stepId={steps.create()} audio="Welcome to vite">
        <Bullets bullets={[['You can be quick']]} />
      </Step>
    </div>
  );
});
