import { observer } from 'mobx-react-lite';
import { Flipped } from 'react-flip-toolkit';
import { createActor } from '/src/actor/Actor';
import { ActorDiv } from '/src/actor/components/ActorDiv';
import { layoutActors } from '/src/actor/layoutActors';
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

  const container = createContainer();
  const a = {
    L: createL(),
    R: createR(),
    L1: createL1(),
    L2: createL2(),
  };

  const step1 = layoutActors(container, [a.L, a.R], 'row', {
    justifyContent: 'center',
  });
  console.log(step1.L!);

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
        <div className={cn('grow', 'relative')}>
          <Flipped flipId="L">
            <ActorDiv actor={step1.L} pick={['root', 'color.blue']}></ActorDiv>
          </Flipped>
          <Flipped flipId="R">
            <ActorDiv actor={step1.R} pick={['root', 'color.blue']}></ActorDiv>
          </Flipped>
        </div>
      )}

      {step >= 2 && (
        <div className={cn('grow', 'relative')}>
          {step === 2 && (
            <Flipped flipId="L">
              <ActorDiv actor={a.L} pick={['root', 'color.green']}>
                <h1 className="title">Part 1</h1>
              </ActorDiv>
            </Flipped>
          )}
          <Flipped flipId="R">
            <ActorDiv actor={a.R} pick={['root', 'color.blue']}>
              <h1 className="title">Part 2</h1>
            </ActorDiv>
          </Flipped>
        </div>
      )}

      {step === 3 && (
        <div className={cn('grow', 'relative')}>
          <ActorDiv actor={a.L1} pick={['root']}>
            <h1 className="title">SCSS</h1>
          </ActorDiv>
          <ActorDiv actor={a.L2} pick={['root']}>
            <h1 className="title">Inline styles</h1>
          </ActorDiv>
        </div>
      )}
    </>
  );
});

function createContainer() {
  return createActor({
    name: 'Container',
    height: 1080,
    width: 1920,
  });
}

function createL() {
  return createActor({
    name: 'L',
    height: 200,
    width: 100,
    x: 50,
    y: 100,
    className: {
      root: ['absolute', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}

function createR() {
  return createActor({
    name: 'R',
    height: 200,
    width: 100,
    x: 180,
    y: 100,
    className: {
      root: ['absolute', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}

function createL1() {
  return createActor({
    name: 'L1',
    height: 100,
    width: 100,
    className: {
      root: ['absolute', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}

function createL2() {
  return createActor({
    name: 'L2',
    height: 30,
    width: 30,
    className: {
      root: ['absolute', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}
