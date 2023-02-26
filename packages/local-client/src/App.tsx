import { Provider } from 'react-redux';
import './App.css';
import CellList from './components/cell-list';
import { store } from './state';

function App() {
  return (
<Provider store={store}>
      <div>
        <CellList />
      </div>
      </Provider>

  );
}

export default App;
