export function createKeyDownHandler(keyHandlers: { [key: string]: Function }) {
  return (key: string, e: any) => {
    const handler = keyHandlers[key];
    if (handler) {
      handler();
      e.preventDefault();
      e.stopPropagation();
    }
  };
}
