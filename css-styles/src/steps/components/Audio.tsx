import { observer } from 'mobx-react-lite';
import React from 'react';
import { speakWithPauses } from '/src/utils/speakWithPauses';

export type PropsT = {
  text: string;
};

export const Audio = observer((props: PropsT) => {
  const [voices, setVoices] = React.useState<SpeechSynthesisVoice[] | null>(
    null
  );
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
    if (voices) {
      const voice = voices.find((x) => x.name === 'Google UK English Male');
      if (voice) {
        speakWithPauses(props.text, voice);
      }
    }
  }, [voices, props.text]);

  return null;
});
