
import { Provider } from 'react-redux';
import './App.css';
import MainComponent from './flow/main';
import store from './store';

function App() {
  return (
    <Provider store={store}>
        <MainComponent />
    </Provider>
  );
}

export default App;
