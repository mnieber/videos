import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Flipped, Flipper } from 'react-flip-toolkit';
import { L } from '/src/frames/layout';
import { cn } from '/src/utils/classnames';

import './AnimatedSlide.scss';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const AnimatedSlide = () => {
  const [step, setStep] = useState(0);

  const handleKeyPress = () => {
    setStep((prevStep) => prevStep + 1);
  };

  React.useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  return (
    <Flipper flipKey={step}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <Flipped flipId="step-0">
            <motion.div
              className={cn(L.col.skewer(), 'square')}
              initial="hidden"
              animate="visible"
              variants={variants}
            >
              <h1 className="title">CSS styles</h1>
              <h2 className="sub-title">By John Doe</h2>
            </motion.div>
          </Flipped>
        )}

        {step === 1 && (
          <Flipped flipId="step-1">
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
          </Flipped>
        )}

        {step === 2 && (
          <Flipped flipId="step-2">
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
          </Flipped>
        )}

        {step === 3 && (
          <Flipped flipId="step-3">
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
          </Flipped>
        )}
      </AnimatePresence>
    </Flipper>
  );
};
