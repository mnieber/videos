import { AnimatePresence, motion } from 'framer-motion';
import { L } from '/src/frames/layout';
import { Slide } from '/src/slides/components/Slide';
import { Step } from '/src/steps/components/Step';
import { cn } from '/src/utils/classnames';

import './AnimatedSlide.scss';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const AnimatedSlide = () => {
  return (
    <Slide id="animated-slide">
      <AnimatePresence mode="wait">
        <Step pos={1} hide={true}>
          <motion.div
            className={cn(L.col.skewer(), 'square')}
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <h1 className="title">CSS styles</h1>
            <h2 className="sub-title">By John Doe</h2>
          </motion.div>
        </Step>

        <Step pos={2} hide={true}>
          <motion.div
            className="split"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <motion.div
              className="rectangle"
              animate={{ x: '-50%' }}
            ></motion.div>
            <motion.div
              className="rectangle"
              animate={{ x: '50%' }}
            ></motion.div>
          </motion.div>
        </Step>

        <Step pos={3} hide={true}>
          <motion.div
            className="split"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <motion.div className="rectangle green">
              <h1 className="title">Part 1</h1>
            </motion.div>
            <motion.div className="rectangle">
              <h1 className="title">Part 2</h1>
            </motion.div>
          </motion.div>
        </Step>

        <Step pos={4} hide={true}>
          <motion.div
            className="split"
            initial="hidden"
            animate="visible"
            variants={variants}
          >
            <motion.div className="square green">
              <h1 className="title">SCSS</h1>
            </motion.div>
            <motion.div className="square">
              <h1 className="title">Inline styles</h1>
            </motion.div>
          </motion.div>
        </Step>
      </AnimatePresence>
    </Slide>
  );
};
