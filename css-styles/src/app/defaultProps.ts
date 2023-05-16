import { withDefaultProps } from 'react-default-props-context';
export { stub, withDefaultProps } from 'react-default-props-context';

// This is a workaround for a bug in webpack
!withDefaultProps && (console as any).log(withDefaultProps);

const dpsFoo = {};

export const defaultProps = {
  ...dpsFoo,
};

export const dps = defaultProps;
