import React from 'react';
import { cn } from '/src/utils/classnames';
import ModalContainer from '/src/utils/components/ModalContainer';

export type PropsT = React.PropsWithChildren<{
  autoFocus?: boolean;
  className?: any;
}>;

export const Presentation = (props: PropsT) => {
  return (
    <ModalContainer
      className={cn('Presentation', props.className)}
      autoFocus={props.autoFocus}
    >
      {props.children}
    </ModalContainer>
  );
};
