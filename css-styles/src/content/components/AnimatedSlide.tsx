import { observer } from 'mobx-react-lite';
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
    <Slide id="animated-slide" className="grow" nrOfSteps={6}>
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
  };

  // 🔳 Step 1
  const step1 = layoutActors(container, [a.L, a.R], 'row', {
    justifyContent: 'center',
  });

  // 🔳 Step 2
  const step2 = layoutActors(container, [a.L, a.R], 'row', {
    justifyContent: 'center',
    gap: 100,
  });

  // 🔳 Step 3
  const step3 = layoutActors(container, [
    step2.L,
    step2.R,
    { ...step2.L, name: 'L1' },
    { ...step2.L, name: 'L2' },
  ]);

  // 🔳 Step 4
  const step4 = layoutActors(container, [
    step3.L,
    step3.R,
    step3.L1,
    step3.L2,
    step3.R,
  ]);
  step4.L1.y += 300;
  step4.L2.y += 600;

  // 🔳 Step 5
  const step5 = layoutActors(container, [
    step4.L,
    step4.R,
    step4.L1,
    step4.L2,
    step4.R,
  ]);

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
          <ActorDiv actor={step1.L} pick={['root', 'color.blue']}></ActorDiv>
          <ActorDiv actor={step1.R} pick={['root', 'color.blue']}></ActorDiv>
        </div>
      )}

      {step === 2 && (
        <div className={cn('grow', 'relative')}>
          <ActorDiv actor={step2.L} pick={['root', 'color.green']}>
            <h1 className="title">Part 1</h1>
          </ActorDiv>
          <ActorDiv actor={step2.R} pick={['root', 'color.blue']}>
            <h1 className="title">Part 2</h1>
          </ActorDiv>
        </div>
      )}

      {step === 3 && (
        <div className={cn('grow', 'relative')}>
          <ActorDiv actor={step3.L1} pick={['root', 'color.green']}></ActorDiv>
          <ActorDiv actor={step3.L2} pick={['root', 'color.green']}></ActorDiv>
          <ActorDiv actor={step3.L} pick={['root', 'color.green']}>
            <h1 className="title">Part 1</h1>
          </ActorDiv>
          <ActorDiv actor={step3.R} pick={['root', 'color.blue']}>
            <h1 className="title">Part 2</h1>
          </ActorDiv>
        </div>
      )}

      {step === 4 && (
        <div className={cn('grow', 'relative')}>
          <ActorDiv actor={step4.L1} pick={['root', 'color.green']}>
            <h1 className="title">SCSS</h1>
          </ActorDiv>
          <ActorDiv actor={step4.L2} pick={['root', 'color.green']}>
            <h1 className="title">Inline styles</h1>
          </ActorDiv>
          <ActorDiv actor={step4.L} pick={['root', 'color.green']}>
            <h1 className="title">Part 1</h1>
          </ActorDiv>
          <ActorDiv actor={step4.R} pick={['root', 'color.blue']}>
            <h1 className="title">Part 2</h1>
          </ActorDiv>
        </div>
      )}

      {step === 5 && (
        <div className={cn('grow', 'relative')}>
          <ActorDiv actor={step5.L1} pick={['root', 'color.green']}>
            <h1 className="title">SCSS</h1>
          </ActorDiv>
          <ActorDiv actor={step5.L2} pick={['root', 'color.green']}>
            <h1 className="title">Inline styles</h1>
          </ActorDiv>
          <ActorDiv actor={step5.L} pick={['root', 'color.green']}>
            <h1 className="title">Part 1</h1>
          </ActorDiv>
          <ActorDiv actor={step5.R} pick={['root', 'color.blue']}>
            <h1 className="title">Part 2</h1>
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
    width: 300,
    x: 0,
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
    width: 300,
    x: 0,
    y: 100,
    className: {
      root: ['absolute', 'rectangle'],
      color: { green: 'green', blue: 'blue' },
    },
  });
}
