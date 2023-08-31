import './index.scss';
import { HashRouter } from 'react-router-dom';
import RouterView from './router';

const App = () => {
  return (
    <HashRouter>
      <RouterView />
    </HashRouter>
  );
};

export default App;
