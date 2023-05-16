import { Dashboard } from '/src/dashboard/components/Dashboard';
import { DeckKeyHandler } from '/src/deck/components/DeckKeyHandler';
import { DeckContext } from '/src/deck/hooks/useDeck';
import { Deck } from '/src/deck/models/Deck';
import { cn } from '/src/utils/classnames';

const deck = new Deck();

export const App = () => {
  return (
    <div className={cn('App')} tabIndex={0}>
      <DeckContext.Provider value={deck}>
        <DeckKeyHandler>
          <Dashboard className="mx-auto" />
        </DeckKeyHandler>
      </DeckContext.Provider>
    </div>
  );
};
