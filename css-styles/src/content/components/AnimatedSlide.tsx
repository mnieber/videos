import { observer } from 'mobx-react-lite';
import { Flipped } from 'react-flip-toolkit';
import { acn, createActor } from '/src/actor/Actor';
import { L as LL } from '/src/frames/layout';
import { Slide } from '/src/slides/components/Slide';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { StepFlipper } from '/src/steps/components/StepFlipper';
import { cn } from '/src/utils/classnames';

import './AnimatedSlide.scss';

export type PropsT = {};

export const AnimatedSlide = observer((props: PropsT) => {
  return (
    <Slide id="animated-slide" className="grow" nrOfSteps={4}>
      <StepFlipper className={cn('AnimatedSlide', LL.col.banner(), 'grow')}>
        <AnimatedSlideInner {...props} />
      </StepFlipper>
    </Slide>
  );
});

const AnimatedSlideInner = observer((props: PropsT) => {
  const slideModel = useSlideModel();
  const step = slideModel.currentStepIndex;

  // Call style(L, "color.green") to get a className that contains L.className.root and L.className.color.green
  const L = createL();
  const R = createR();
  const L1 = createL1();
  const L2 = createL2();

  // TODO:
  // - use container.addActor('L') and container.get('L')
  // - maybe use const { L, R } = container.actors
  // - flex returns a new container with a copy of the actors
  // - use style={L.style} to get the style object that has left, top, height, width

  return (
    <>
      {step === 0 && (
        <div className={cn(LL.col.skewer(), 'justify-center', 'grow')}>
          <h1 className={cn(LL.Slide.heading.xl(), 'mb-4')}>
            CSS Style Management
          </h1>
          <h2 className={cn(LL.Slide.heading.l())}>nieber.code</h2>
        </div>
      )}

      {step === 1 && (
        <div className={cn('w-full h-full', 'bg-pink-100')}>
          <Flipped flipId="L">
            <div className={acn(L, 'root', 'color.blue')}></div>
          </Flipped>
          <Flipped flipId="R">
            <div className={acn(R, 'root', 'color.blue')}></div>
          </Flipped>
        </div>
      )}

      {step >= 2 && (
        <div className={cn(LL.row.skewer(), 'justify-center', 'grow')}>
          {step === 2 && (
            <Flipped flipId="L">
              <div className={acn(L, 'root', 'color.green')}>
                <h1 className="title">Part 1</h1>
              </div>
            </Flipped>
          )}
          <Flipped flipId="R">
            <div className={acn(R, 'root', 'color.blue')}>
              <h1 className="title">Part 2</h1>
            </div>
          </Flipped>
        </div>
      )}

      {step === 3 && (
        <div className={cn(LL.col.skewer(), 'justify-center', 'grow')}>
          <div className={acn(L1, 'root')}>
            <h1 className="title">SCSS</h1>
          </div>
          <div className={acn(L2, 'root')}>
            <h1 className="title">Inline styles</h1>
          </div>
        </div>
      )}
    </>
  );
});

function createL() {
  return createActor({
    height: 600,
    width: 300,
    x: 50,
    y: 100,
    className: {
      root: ['relative', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}

function createL1() {
  return createActor({
    height: 300,
    width: 300,
    className: {
      root: ['relative', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}

function createL2() {
  return createActor({
    height: 300,
    width: 300,
    className: {
      root: ['relative', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}

function createR() {
  return createActor({
    height: 600,
    width: 300,
    x: 250,
    y: 300,
    className: {
      root: ['relative', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}
