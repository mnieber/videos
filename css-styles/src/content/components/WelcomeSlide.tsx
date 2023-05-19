import { observer } from 'mobx-react-lite';
import { Indent } from '/src/frames/components/Indent';
import { Slide } from '/src/slides/components/Slide';
import { useSlideModel } from '/src/slides/hooks/useSlideModel';
import { Audio } from '/src/steps/components/Audio';
import { Bullet } from '/src/steps/components/Bullet';
import { FullScreenGif } from '/src/steps/components/FullScreenGif';

export type PropsT = {
  className?: any;
};

export const WelcomeSlide = observer((props: PropsT) => {
  return (
    <Slide id="Welcome" nrOfSteps={5}>
      <WelcomeSlideInner />
    </Slide>
  );
});

const text = `
Hello. The topic for today's video course is CSS style management.
In the first part of the course, I will talk about two common approaches for styling your elements: SCSS files and inline styles.
I will explain why managing CSS is challenging, and why I believe that using inline styles is the better approach.
In the second part, I will show my own approach for managing the styles, which uses both inline styles and SCSS files.
`;

const WelcomeSlideInner = observer((props: PropsT) => {
  const slideModel = useSlideModel();
  const step = slideModel.currentStepIndex;

  return (
    <>
      {step >= 0 && <div>CSS style management</div>}
      {step >= 1 && (
        <>
          <Audio text={text} />
          <div>Part 1</div>
          <Indent>
            <div>SCSS files</div>
            <div className="flex flex-row">
              Inline styles{' '}
              {step >= 4 && <div className="ml-2">The winner is</div>}
            </div>
          </Indent>
        </>
      )}

      {step >= 2 && (
        <>
          {true && <FullScreenGif id="2" gifUrl="/src/gif/test.gif" />}
          <Indent>
            <div>One</div>
            <Indent>
              <div>Two</div>
              {step >= 4 && <div>Two point five</div>}
              <div>Three</div>
              <Indent>
                <div>Four</div>
              </Indent>
            </Indent>
          </Indent>
        </>
      )}
      {step >= 0 && <Bullet isPreviewed={step <= 2}>You can be quick</Bullet>}
    </>
  );
});
