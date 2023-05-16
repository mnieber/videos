import { observer } from 'mobx-react-lite';
import { Indent } from '/src/frames/components/Indent';
import { Audio } from '/src/steps/components/Audio';
import { FullScreenGif } from '/src/steps/components/FullScreenGif';
import { StepView } from '/src/steps/components/StepView';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

export const Dashboard = observer((props: PropsT) => {
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
      <StepView id="1">
        <Audio text="Hello" />
        <div>One</div>
      </StepView>
      <StepView id="2">
        <div>"Let's go"</div>
      </StepView>
      <FullScreenGif id="2" gifUrl="/src/gif/test.gif" />
      <StepView id="3">
        <Indent>
          <div>One</div>
          <Indent>
            <div>Two</div>
            <div>Three</div>
          </Indent>
        </Indent>
      </StepView>
      <StepView id="4">
        <Audio text="Welcome to vite" />
        <div>You can be quick</div>
      </StepView>
    </div>
  );
});
