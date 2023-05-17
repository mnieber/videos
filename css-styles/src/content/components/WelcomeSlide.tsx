import { observer } from 'mobx-react-lite';
import { Indent } from '/src/frames/components/Indent';
import { Slide } from '/src/slides/components/Slide';
import { Audio } from '/src/steps/components/Audio';
import { FullScreenGif } from '/src/steps/components/FullScreenGif';
import { Step } from '/src/steps/components/Step';

export type PropsT = {
  className?: any;
};

export const WelcomeSlide = observer((props: PropsT) => {
  return (
    <Slide id="Welcome">
      <Step pos={1}>
        <div>CSS style management</div>
      </Step>
      <Step pos={2}>
        <Audio text={text} />
        <div>Part 1</div>
        <Indent>
          <div>SCSS files</div>
          <Step pos={5}>The winner is</Step>
          <div>Inline styles</div>
        </Indent>
      </Step>
      <Step pos={3}>
        <FullScreenGif id="2" gifUrl="/src/gif/test.gif" />
        <Indent>
          <div>One</div>
          <Indent>
            <div>Two</div>
            <Step pos={5}>Two point five</Step>
            <div>Three</div>
            <Indent>
              <div>Four</div>
            </Indent>
          </Indent>
        </Indent>
      </Step>
      <Step pos={4}>
        <Audio text="Welcome to vite" />
        <div>You can be quick</div>
      </Step>
    </Slide>
  );
});

const text = `
Hello. The topic for today's video course is CSS style management.
In the first part of the course, I will talk about two common approaches for styling your elements: SCSS files and inline styles.
We will go into the challenges that developers face when using these approaches, and I will explain why I believe that
using inline styles is the better approach.
In the second part, I will show my own approach for managing the styles, which uses both inline styles and SCSS files.
`;
