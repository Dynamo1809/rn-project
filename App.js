import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';

import db from './firebase/config';
import { useRoute } from './router.js';
import { store } from './redux/store.js';

export default function App() {
  const [user, setUser] = useState(null);
  db.auth().onAuthStateChanged((user) => setUser(user));
  const routing = useRoute(user);

  return (
    <Provider store={store}>
      <NavigationContainer>{routing}</NavigationContainer>
    </Provider>
  );
}
