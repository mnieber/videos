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
      <StepFlipper className={cn('AnimatedSlide', L.col.banner(), 'grow')}>
        <AnimatedSlideInner {...props} />
      </StepFlipper>
    </Slide>
  );
});

const AnimatedSlideInner = observer((props: PropsT) => {
  const slideModel = useSlideModel();
  const step = slideModel.currentStepIndex;

  const actors = {
    L: {
      root: cn('L', 'relative', 'rectangle'),
      color: { green: 'green', blue: 'blue' },
    },
    R: {
      root: cn('R', 'relative', 'rectangle'),
      color: { green: 'green', blue: 'blue' },
    },
    L1: cn('L1', 'relative', 'square', 'green'),
    L2: cn('L2', 'relative', 'square'),
  };
  const a = actors;

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
        <div className={cn('w-full h-full', 'bg-pink-100')}>
          <Flipped flipId="L">
            <div
              className={cn(a.L.root, a.L.color.blue)}
              style={{ top: 50, left: 100 }}
            ></div>
          </Flipped>
          <Flipped flipId="R">
            <div
              className={cn(a.R.root, a.L.color.blue)}
              style={{ top: 250, left: 300 }}
            ></div>
          </Flipped>
        </div>
      )}

      {step >= 2 && (
        <div className={cn(L.row.skewer(), 'justify-center', 'grow')}>
          {step === 2 && (
            <Flipped flipId="L">
              <div
                className={cn(a.L.root, a.L.color.green)}
                style={{ marginRight: '200px' }}
              >
                <h1 className="title">Part 1</h1>
              </div>
            </Flipped>
          )}
          <Flipped flipId="R">
            <div
              className={cn(a.R.root, a.L.color.blue)}
              style={{ marginLeft: '200px' }}
            >
              <h1 className="title">Part 2</h1>
            </div>
          </Flipped>
        </div>
      )}

      {step === 3 && (
        <div className={cn(L.col.skewer(), 'justify-center', 'grow')}>
          <div className={cn(a.L1)}>
            <h1 className="title">SCSS</h1>
          </div>
          <div className={cn(a.L2)}>
            <h1 className="title">Inline styles</h1>
          </div>
        </div>
      )}
    </>
  );
});
