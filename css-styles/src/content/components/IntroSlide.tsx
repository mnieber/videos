import { observer } from 'mobx-react-lite';
import { Slide } from '/src/slides/components/Slide';
import { Step } from '/src/steps/components/Step';

export type PropsT = {
  className?: any;
};

export const IntroSlide = observer((props: PropsT) => {
  return (
    <Slide id="Intro">
      <Step pos={1}>
        <div>Intro</div>
      </Step>
      <Step pos={2}>
        <div>Time</div>
      </Step>
    </Slide>
  );
});
