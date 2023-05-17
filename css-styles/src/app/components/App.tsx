import { Dashboard } from '/src/dashboard/components/Dashboard';
import { Deck } from '/src/deck/components/Deck';
import { DeckKeyHandler } from '/src/deck/components/DeckKeyHandler';
import { DeckProvider } from '/src/deck/components/DeckProvider';
import { DeckModel } from '/src/deck/models/DeckModel';
import { cn } from '/src/utils/classnames';

const deck = new DeckModel();

export const App = () => {
  return (
    <div className={cn('App')} tabIndex={0}>
      <DeckProvider value={deck}>
        <DeckKeyHandler>
          <Deck className="w-[1920px] h-[1080px] flex flex-row">
            <Dashboard className="mx-auto" />
          </Deck>
        </DeckKeyHandler>
      </DeckProvider>
    </div>
  );
};
