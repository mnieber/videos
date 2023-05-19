import { Dashboard } from '/src/dashboard/components/Dashboard';
import { DeckProvider } from '/src/deck/components/DeckProvider';
import { DeckModel } from '/src/deck/models/DeckModel';
import { cn } from '/src/utils/classnames';
import EnableSpeechSynthesis from '/src/utils/components/EnableSpeechSynthesis';

const deck = new DeckModel();

export const App = () => {
  return (
    <div className={cn('App')} tabIndex={0}>
      <DeckProvider value={deck}>
        <EnableSpeechSynthesis />
        <Dashboard className="" />
      </DeckProvider>
    </div>
  );
};
