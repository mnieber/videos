import { useTts } from 'tts-react';
export type PropsT = React.PropsWithChildren<{}>;

export const Speak = (props: PropsT) => {
  const voices = speechSynthesis.getVoices();
  const voice =
    voices.find((x) => x.name === 'Google UK English Male') ?? voices[0];

  return (
    <>
      {
        useTts({ children: props.children, autoPlay: true, voice: voice })
          .ttsChildren
      }
    </>
  );
};
