import { Dashboard } from '/src/dashboard/components/Dashboard';
import { DeckKeyHandler } from '/src/deck/components/DeckKeyHandler';
import { DeckContext } from '/src/deck/hooks/useDeckModel';
import { DeckModel } from '/src/deck/models/DeckModel';
import { cn } from '/src/utils/classnames';

const deck = new DeckModel();

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
