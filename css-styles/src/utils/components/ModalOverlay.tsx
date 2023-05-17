import React from 'react';

// Import styles
import './ModalOverlay.scss';

export type PropsT = React.PropsWithChildren<{}>;

export const ModalOverlay = (props: PropsT) => {
  return <div className="ModalOverlay">{props.children}</div>;
};
