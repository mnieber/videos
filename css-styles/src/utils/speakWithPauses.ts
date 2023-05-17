type SpeechPart = {
  text: string;
  pauseInMs: number;
};

export const speakWithPauses = async (
  text: string,
  voice: SpeechSynthesisVoice
) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(`<root>${text}</root>`, 'text/xml');

  let parts: SpeechPart[] = [];
  for (const child of Array.from(xml.documentElement.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      for (const part of _splitText(child.textContent || '', 170)) {
        parts.push({ text: part, pauseInMs: 0 });
      }
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.nodeName === 'break') {
        const lastPart = parts[parts.length - 1];
        if (lastPart) {
          lastPart.pauseInMs = timeAttributeToMs(
            (child as Element).getAttribute('time') || ''
          );
        }
      }
    }
  }

  for (let i = 0; i < parts.length; i++) {
    let utterance = new SpeechSynthesisUtterance(parts[i].text);
    utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
    await new Promise((resolve) => {
      utterance.onend = resolve;
    });
    if (parts[i].pauseInMs) {
      await new Promise((resolve) => setTimeout(resolve, parts[i].pauseInMs));
    }
  }
};

function timeAttributeToMs(time: string): number {
  if (time.endsWith('ms')) {
    return parseFloat(time.slice(0, -2));
  }
  if (time.endsWith('s')) {
    return parseFloat(time) * 1000;
  }
  return 0;
}

function _splitText(text: string, maxLength: number): string[] {
  const regex = new RegExp(`.{1,${maxLength}}`, 'g');
  return text.match(regex) || [];
}
