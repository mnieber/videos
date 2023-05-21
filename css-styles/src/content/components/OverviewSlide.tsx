import { observer } from 'mobx-react-lite';
import { createActor } from '/src/actor/Actor';
import { Container, createDiv } from '/src/actor/Container';
import { layoutActors } from '/src/actor/layoutActors';
import { L } from '/src/frames/layout';
import { Slide } from '/src/slides/components/Slide';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { StepFlipper } from '/src/steps/components/StepFlipper';
import { cn } from '/src/utils/classnames';

import './OverviewSlide.scss';

export type PropsT = {};

export const OverviewSlide = observer((props: PropsT) => {
  return (
    <Slide id="overview-slide" className="grow" nrOfSteps={6}>
      <StepFlipper className={cn('OverviewSlide', L.col.banner(), 'grow')}>
        <OverviewSlideInner {...props} />
      </StepFlipper>
    </Slide>
  );
});

const OverviewSlideInner = observer((props: PropsT) => {
  const slideModel = useSlideModel();
  const step = slideModel.currentStepIndex;

  const container = new Container({
    height: 1080,
    width: 1920,
    layout: <div className={cn('grow', 'relative')}></div>,
    actors: {
      L: createL(),
      R: createR(),
      L1: { ...createL(), visible: false },
      L2: { ...createL(), visible: false },
      R1: { ...createR(), visible: false },
    },
  });

  // 🔳 Step 1
  // We show L and R side by side
  const step1 = container.copy();
  layoutActors(step1, [step1.actors.L, step1.actors.R], 'row', {
    justifyContent: 'center',
  });

  // 🔳 Step 2
  // L and R move apart and show "Part 1" and "Part 2"
  const step2 = step1.copy();
  layoutActors(step2, [step2.actors.L, step2.actors.R], 'row', {
    justifyContent: 'center',
    gap: 100,
  });
  step2.update({
    L: {
      child: <h1 className="title">Part 1</h1>,
      dPickStyles: ['color.greenDark'],
    },
    R: { child: <h1 className="title">Part 2</h1> },
  });

  // 🔳 Step 3
  // L1 and L2 become visible
  const step3 = step2.copy();
  step3.update({
    L1: {
      visible: true,
      posFrom: step3.actors.L,
      dPickStyles: ['z.0', 'color.green'],
    },
    L2: {
      visible: true,
      posFrom: step3.actors.L,
      dPickStyles: ['z.0', 'color.green'],
    },
  });

  // 🔳 Step 4
  // L1 and L2 move down and get content, R1 becomes visible
  const step4 = step3.copy();
  step4.update({
    L1: { dy: 300 },
    L2: { dy: 600 },
    R1: {
      visible: true,
      posFrom: step4.actors.R,
      dPickStyles: ['z.0', 'color.blue'],
    },
  });
  step4.update({
    L1: { child: <h1 className="title">SCSS</h1> },
    L2: { child: <h1 className="title">Inline Styles</h1> },
  });

  // 🔳 Step 5
  // R1 moves down and gets content
  const step5 = step4.copy();
  step5.update({
    R1: { dy: 300 },
  });
  step5.update({
    R1: { child: <h1 className="title">Custom Solution</h1> },
  });

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
      {step === 1 && createDiv(step1)}
      {step === 2 && createDiv(step2)}
      {step === 3 && createDiv(step3)}
      {step === 4 && createDiv(step4)}
      {step === 5 && createDiv(step5)}
    </>
  );
});

const colorStyles = {
  green: 'bg-green-600',
  greenDark: 'bg-green-800',
  blue: 'bg-blue-600',
  blueDark: 'bg-blue-800',
};

function createL() {
  return createActor({
    name: 'L',
    height: 200,
    width: 300,
    x: 0,
    y: 100,
    styles: {
      root: ['rectangle'],
      color: colorStyles,
      z: { 0: 'z-0', 10: 'z-10', 20: 'z-20' },
    },
    pickStyles: ['root', 'color.blueDark', 'z.10'],
  });
}

function createR() {
  return createActor({
    name: 'R',
    height: 200,
    width: 300,
    x: 0,
    y: 100,
    styles: {
      root: ['rectangle'],
      color: colorStyles,
      z: { 0: 'z-0', 10: 'z-10', 20: 'z-20' },
    },
    pickStyles: ['root', 'color.blueDark', 'z.10'],
  });
}
