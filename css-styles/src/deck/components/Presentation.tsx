import React from 'react';
import { cn } from '/src/utils/classnames';
import ModalContainer from '/src/utils/components/ModalContainer';

export type PropsT = React.PropsWithChildren<{
  className?: any;
}>;

export const Presentation = (props: PropsT) => {
  return (
    <ModalContainer className={cn('Deck', props.className)}>
      {props.children}
    </ModalContainer>
  );
};
