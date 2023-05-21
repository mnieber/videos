import { observer } from 'mobx-react-lite';
import { createActor } from '/src/actor/Actor';
import { Container, createDiv } from '/src/actor/Container';
import { TypescriptCard } from '/src/shapes/components/TypescriptCard';
import { Slide } from '/src/slides/components/Slide';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { Audio } from '/src/steps/components/Audio';
import { cn } from '/src/utils/classnames';

export type PropsT = {
  className?: any;
};

export const ScssSlide = observer((props: PropsT) => {
  return (
    <Slide id="Welcome" nrOfSteps={1}>
      <ScssSlideInner />
    </Slide>
  );
});

const text = `
Hello. The topic for today's video course is CSS style management.
In the first part of the course, I will talk about two common approaches for styling your elements: SCSS files and inline styles.
I will explain why managing CSS is challenging, and why I believe that using inline styles is the better approach.
In the second part, I will show my own approach for managing the styles, which uses both inline styles and SCSS files.
`;

const ScssSlideInner = observer((props: PropsT) => {
  const slideModel = useSlideModel();
  const step = slideModel.currentStepIndex;

  const container = new Container({
    height: 1080,
    width: 1920,
    layout: <div className={cn('grow', 'relative')}></div>,
    actors: {
      L: createL(),
      R1: { ...createR() },
      R2: { ...createR() },
      R3: { ...createR() },
    },
  });
  container.update({
    L: { child: <Audio text={text} /> },
    R2: { dy: 300 },
    R3: { dy: 600, child: <TypescriptCard /> },
  });

  return <>{step === 0 && createDiv(container)}</>;
});

function createL() {
  return createActor({
    name: 'L',
    height: 200,
    width: 300,
    x: 0,
    y: 100,
    styles: {
      root: ['bg-blue-400'],
    },
    pickStyles: ['root'],
  });
}

function createR() {
  return createActor({
    name: 'R',
    height: 200,
    width: 300,
    x: 500,
    y: 100,
    styles: {
      root: ['bg-blue-400'],
    },
    pickStyles: ['root'],
  });
}
