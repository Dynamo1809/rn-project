import { Provider } from 'react-redux';

import { store } from './redux/store.js';
import Main from './components/Main.js';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
