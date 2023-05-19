import { observer } from 'mobx-react-lite';
import { Slide } from '/src/slides/components/Slide';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';

export type PropsT = {
  className?: any;
};

export const IntroSlide = observer((props: PropsT) => {
  return (
    <Slide id="Intro" nrOfSteps={2}>
      <IntroSlideInner />
    </Slide>
  );
});

const IntroSlideInner = observer(() => {
  const slideModel = useSlideModel();
  const step = slideModel.currentStepIndex;

  return (
    <>
      {step >= 0 && <div>Intro</div>}
      {step >= 1 && <div>Time</div>}
    </>
  );
});
