import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './combine';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export const configureStore = (initialState?: any) => {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    rootReducer,
    initialState || {},
    composeWithDevTools(applyMiddleware(thunk, epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);
  return store;
};

export type RootStoreType = ReturnType<typeof rootReducer>;
