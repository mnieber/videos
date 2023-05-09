import { stub, withDefaultProps } from 'react-default-props-context';
import { Script } from '/src/script/Script';
export { stub, withDefaultProps } from 'react-default-props-context';

// This is a workaround for a bug in webpack
!withDefaultProps && (console as any).log(withDefaultProps);

const dpsScript = {
  script: {
    script: stub as Script,
  },
};

export const defaultProps = {
  ...dpsScript,
};

export const dps = defaultProps;
