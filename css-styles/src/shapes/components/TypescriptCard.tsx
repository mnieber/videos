import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const TypescriptCard = () => {
  const codeString = `
export const TypescriptCard = () => {
  return (
    <SyntaxHighlighter language="jsx" style={dark}>
      {codeString.trim()}
    </SyntaxHighlighter>
  );
};
  `;

  return (
    <SyntaxHighlighter language="tsx" style={a11yDark}>
      {codeString.trim()}
    </SyntaxHighlighter>
  );
};
