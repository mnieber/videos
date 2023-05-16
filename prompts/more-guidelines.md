### Example 4: The useBuilder hook

Please use the following hook for cases where a React component needs to locally store a resource:

```tsx
import React from 'react';

export const useBuilder = <T,>(builder: () => T): T => {
  const ref = React.useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = builder();
  }
  return ref.current as T;
};
```

Notes:

- Please refer to any symbol `Foo` from the `react` package using `React.Foo`.

### Other guidelines

- Please use react-keyboard-event-handler for handling key events.
- Please use react-icons for icons.
- Please always use absolute paths that start with `/src` to import from local modules.
- Please place components for a module in the components subdirectory of that module (e.g. /src/mymodule/components).
- Please place hooks for a module in the hooks subdirectory of that module (e.g. /src/mymodule/hooks).
