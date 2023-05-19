import { observer } from 'mobx-react-lite';
import { Flipped } from 'react-flip-toolkit';
import { L } from '/src/frames/layout';
import { Slide } from '/src/slides/components/Slide';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { StepFlipper } from '/src/steps/components/StepFlipper';
import { cn } from '/src/utils/classnames';

import './AnimatedSlide.scss';

export type PropsT = {};

export const AnimatedSlide = observer((props: PropsT) => {
  return (
    <Slide id="animated-slide" className="grow" nrOfSteps={4}>
      <StepFlipper className={cn(L.col.banner(), 'grow')}>
        <AnimatedSlideInner {...props} />
      </StepFlipper>
    </Slide>
  );
});

const AnimatedSlideInner = observer((props: PropsT) => {
  const slideModel = useSlideModel();
  const step = slideModel.currentStepIndex;

  return (
    <>
      {step === 0 && (
        <div className={cn(L.col.skewer(), 'justify-center', 'grow')}>
          <h1 className={cn(L.Slide.heading.xl(), 'mb-4')}>
            CSS Style Management
          </h1>
          <h2 className={cn(L.Slide.heading.l())}>nieber.code</h2>
        </div>
      )}

      {step === 1 && (
        <div className="">
          <Flipped flipId="L">
            <div
              className="rectangle green"
              style={{ marginLeft: '100px' }}
            ></div>
          </Flipped>
          <Flipped flipId="R">
            <div className="rectangle" style={{ marginTop: '100px' }}></div>
          </Flipped>
        </div>
      )}

      {step === 2 && (
        <div className="">
          <Flipped flipId="L">
            <div className="rectangle green" style={{ marginLeft: '200px' }}>
              <h1 className="title">Part 1</h1>
            </div>
          </Flipped>
          <Flipped flipId="R">
            <div className="rectangle" style={{ marginTop: '200px' }}>
              <h1 className="title">Part 2</h1>
            </div>
          </Flipped>
        </div>
      )}

      {step === 3 && (
        <div className="">
          <div className="square green">
            <h1 className="title">SCSS</h1>
          </div>
          <div className="square">
            <h1 className="title">Inline styles</h1>
          </div>
        </div>
      )}
    </>
  );
});
