import { observer } from 'mobx-react-lite';
import React from 'react';
import { cn } from '/src/utils/classnames';

export type PropsT = React.PropsWithChildren<{
  className?: string;
}>;

// Define the IndentContext
export const IndentContext = React.createContext<number>(0);

export const Indent = observer((props: PropsT) => {
  const parentIndentLevel = React.useContext(IndentContext) ?? 0;
  const indentLevel = parentIndentLevel + 1;

  return (
    <IndentContext.Provider value={indentLevel}>
      <div
        className={cn('Indent', props.className)}
        style={{ marginLeft: indentLevel * 8 }}
      >
        {props.children}
      </div>
    </IndentContext.Provider>
  );
});
