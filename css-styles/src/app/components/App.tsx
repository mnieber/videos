import { Dashboard } from '/src/dashboard/components/Dashboard';
import { ScriptKeyHandler } from '/src/script/components/ScriptKeyHandler';
import { ScriptProvider } from '/src/script/components/ScriptProvider';
import { cn } from '/src/utils/classnames';

export const App = () => {
  return (
    <div className={cn('App')} tabIndex={0}>
      <ScriptProvider>
        <ScriptKeyHandler>
          <Dashboard className="mx-auto" />
        </ScriptKeyHandler>
      </ScriptProvider>
    </div>
  );
};
