import './App.scss';
import React from 'react';

import AppInit from './AppInit';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import ServiceProvider from './api/context/service.context';

const App: React.FC = () => (
  <Provider store={configureStore()}>
    <ServiceProvider>
      <AppInit />
    </ServiceProvider>
  </Provider>
);

export default App;
