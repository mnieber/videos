import { observer } from 'mobx-react-lite';
import { Indent } from '/src/frames/components/Indent';
import { Slide } from '/src/slides/components/Slide';
import { Audio } from '/src/steps/components/Audio';
import { FullScreenGif } from '/src/steps/components/FullScreenGif';
import { Step } from '/src/steps/components/Step';
import { cn } from '/src/utils/classnames';
import { ModalOverlay } from '/src/utils/components/ModalOverlay';

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
        <Step id="2.5">
          <div className="bg-green-600 p-16">
            <h1>Im still normal</h1>
            <ModalOverlay>Hey!</ModalOverlay>
          </div>
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
