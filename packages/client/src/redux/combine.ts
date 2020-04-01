import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { authReducer } from './auth/reducer';
import { authEpics } from './auth/epic';

export const rootEpic = combineEpics(...authEpics);
export const rootReducer = combineReducers({
  authState: authReducer,
});
