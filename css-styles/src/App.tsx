import { SceneView } from '/src/scenes/components/SceneView';
import { ScriptProvider } from '/src/script/components/ScriptProvider';

// Import styles
import './App.scss';

function App() {
  return (
    <ScriptProvider>
      <SceneView />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ScriptProvider>
  );
}

export default App;
