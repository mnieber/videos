import React from 'react';
import { DeckContext } from '/src/deck/hooks/useDeckModel';
import { DeckModel } from '/src/deck/models/DeckModel';

export type PropsT = React.PropsWithChildren<{
  value: DeckModel;
}>;

export const DeckProvider = (props: PropsT) => {
  return (
    <DeckContext.Provider value={props.value}>
      {props.children}
    </DeckContext.Provider>
  );
};
