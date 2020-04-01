import './App.scss';
import React from 'react';

import AppInit from './AppInit';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

const App: React.FC = () => (
  <Provider store={configureStore()}>
    <AppInit />;
  </Provider>
);

export default App;
