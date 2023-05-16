import React from 'react';
import { DeckModel } from '/src/deck/models/DeckModel';

export const DeckContext = React.createContext<DeckModel | null>(null);

export const useDeckModel = () => {
  const deck = React.useContext(DeckContext);

  if (!deck) {
    throw new Error(`No deck in context.`);
  }

  return deck;
};
