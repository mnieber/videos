import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStepModel } from '/src/steps/hooks/useStepModel';
import { speakWithPauses } from '/src/utils/speakWithPauses';

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
        if (true) {
          speakWithPauses(props.text, voice);
        } else {
          const utterThis = new SpeechSynthesisUtterance();
          utterThis.text = props.text;
          utterThis.voice = voice!;
          speechSynthesis.speak(utterThis);
        }
      }
    }
  }, [step.isCurrent, voices, props.text]);

  return null;
});
