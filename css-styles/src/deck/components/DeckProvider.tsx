import React from 'react';
import { DeckContext } from '/src/deck/hooks/useDeck';
import { Deck } from '/src/deck/models/Deck';
import { useBuilder } from '/src/utils/hooks/useBuilder';

export type PropsT = React.PropsWithChildren<{}>;

export const DeckProvider = (props: PropsT) => {
  const deck = useBuilder(() => {
    const deck = new Deck();
    return deck;
  });

  return (
    <DeckContext.Provider value={deck}>{props.children}</DeckContext.Provider>
  );
};
