import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStepModel } from '/src/steps/hooks/useStepModel';

export type PropsT = {
  text: string;
};

export const Audio = observer((props: PropsT) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[] | null>(
    null
  );
  const step = useStepModel();

  React.useEffect(() => {
    function handleVoicesChanged() {
      setVoices(speechSynthesis.getVoices());
    }

    speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
    handleVoicesChanged();
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, []);

  React.useEffect(() => {
    if (step.isCurrent && voices) {
      const voice = voices.find((x) => x.name === 'Google UK English Male');
      if (voice) {
        const utterThis = new SpeechSynthesisUtterance(props.text);
        utterThis.voice = voice;
        speechSynthesis.speak(utterThis);
        console.log('speaking', props.text);
      }
    }
  }, [step.isCurrent, voices, props.text]);

  return null;
});
