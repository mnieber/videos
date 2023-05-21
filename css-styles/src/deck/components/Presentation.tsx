import React from 'react';
import { useDeckModel } from '/src/deck/hooks/useDeckModel';
import { cn } from '/src/utils/classnames';
import ModalContainer from '/src/utils/components/ModalContainer';

export type PropsT = React.PropsWithChildren<{
  autoFocus?: boolean;
  className?: any;
}>;

export const Presentation = (props: PropsT) => {
  const deckModel = useDeckModel();

  return (
    <ModalContainer
      className={cn('Presentation', props.className)}
      autoFocus={props.autoFocus}
      onMouseMove={(e: React.MouseEvent) => {
        const parentRect = e.currentTarget.getBoundingClientRect();
        deckModel.setMousePos([
          e.clientX - parentRect.left,
          e.clientY - parentRect.top,
        ]);
      }}
    >
      {props.children}
    </ModalContainer>
  );
};
