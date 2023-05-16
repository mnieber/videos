import React from 'react';
import { DeckContext } from '/src/deck/hooks/useDeckModel';
import { DeckModel } from '/src/deck/models/DeckModel';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

export const DeckProvider = (props: PropsT) => {
  const deck = useBuilder(() => {
    const deck = new DeckModel();
    return deck;
  });

  return (
    <DeckContext.Provider value={deck}>{props.children}</DeckContext.Provider>
  );
};
