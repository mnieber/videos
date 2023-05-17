import React from 'react';

export const EnableSpeechSynthesis = () => {
  const [isSpeechSupported, setIsSpeechSupported] = React.useState(false);
  const textToSpeak = 'Hello, this is a test for speech synthesis.';

  React.useEffect(() => {
    setIsSpeechSupported('speechSynthesis' in window);
  }, []);

  const speakText = () => {
    if (isSpeechSupported) {
      let speech = new SpeechSynthesisUtterance();
      speech.text = textToSpeak;
      speechSynthesis.speak(speech);
    } else {
      console.log("Sorry, your browser doesn't support text to speech.");
    }
  };

  return <button onClick={speakText}>Click me to Speak</button>;
};

export default EnableSpeechSynthesis;
