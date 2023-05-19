import { Flipped } from 'react-flip-toolkit';
import { L } from '/src/frames/layout';
import { Slide } from '/src/slides/components/Slide';
import { Step } from '/src/steps/components/Step';
import { StepFlipper } from '/src/steps/components/StepFlipper';
import { cn } from '/src/utils/classnames';

import './AnimatedSlide.scss';

export const AnimatedSlide = () => {
  return (
    <Slide id="animated-slide" className="grow">
      <StepFlipper className={cn(L.col.banner(), 'grow')}>
        <Step pos={1} hide={true}>
          <div className={cn(L.col.skewer(), 'justify-center', 'grow')}>
            <h1 className={cn(L.Slide.heading.xl(), 'mb-4')}>
              CSS Style Management
            </h1>
            <h2 className={cn(L.Slide.heading.l())}>nieber.code</h2>
          </div>
        </Step>

        <Step pos={2} hide={true}>
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
        </Step>

        <Step pos={3} hide={true}>
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
        </Step>

        <Step pos={4} hide={true}>
          <div className="">
            <div className="square green">
              <h1 className="title">SCSS</h1>
            </div>
            <div className="square">
              <h1 className="title">Inline styles</h1>
            </div>
          </div>
        </Step>
      </StepFlipper>
    </Slide>
  );
};
