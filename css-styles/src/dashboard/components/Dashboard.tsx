import { observer } from 'mobx-react-lite';
import { Indent } from '/src/frames/components/Indent';
import { Slide } from '/src/slides/components/Slide';
import { Audio } from '/src/steps/components/Audio';
import { FullScreenGif } from '/src/steps/components/FullScreenGif';
import { Step } from '/src/steps/components/Step';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

export const Dashboard = observer((props: PropsT) => {
  return (
    <div
      className={cn('Dashboard', 'bg-blue-600', 'grow', props.className)}
      ref={(el) => el?.focus()}
      tabIndex={1}
    >
      <Slide id="Welcome">
        <Step id="1">
          <Audio text="Hello" />
          <div>One</div>
        </Step>
        <Step id="2">
          <Audio text="Friend" />
          <div>"Let's go"</div>
          <FullScreenGif id="2" gifUrl="/src/gif/test.gif" />
        </Step>
        <Step id="3">
          <Indent>
            <div>One</div>
            <Indent>
              <div>Two</div>
              <div>Three</div>
              <Indent>
                <div>Four</div>
              </Indent>
            </Indent>
          </Indent>
        </Step>
        <Step id="4">
          <Audio text="Welcome to vite" />
          <div>You can be quick</div>
        </Step>
      </Slide>
    </div>
  );
});
