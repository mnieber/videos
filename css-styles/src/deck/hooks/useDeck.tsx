import React from 'react';
import { Deck } from '/src/deck/models/Deck';

export const DeckContext = React.createContext<Deck | null>(null);

export const useDeck = () => {
  const deck = React.useContext(DeckContext);

  if (!deck) {
    throw new Error(`No deck in context.`);
  }

  return deck;
};
