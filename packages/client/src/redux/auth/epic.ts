import { Epic } from 'redux-observable';
import { isOfType } from 'typesafe-actions';
import { filter, switchMap, tap, ignoreElements } from 'rxjs/operators';
import Axios from 'axios';
import { AuthActionType, AuthActions } from './action';
import { IUser } from '../../../../shared/models/user';
import { AuthServices } from 'src/api/services/auth.service';

const login: Epic = actions$ =>
  actions$.pipe(
    filter(isOfType(AuthActionType.LOGIN)),
    switchMap(async action => {
      const { username, password } = action.payload;
      try {
        const response = await Axios.post<{ user: IUser; message: string; token: string; hasError: boolean }>(
          '/auth/login',
          {
            username,
            password,
          },
        );

        if (!!response.data.hasError) {
          throw response.data.message;
        }

        AuthServices.setToken(response.data.token);
        AuthServices.setUser(response.data.user);
        return AuthActions.authSuccess(response.data.user);
      } catch (error) {
        return AuthActions.authError(error.message);
      }
    }),
  );

const register: Epic = actions$ =>
  actions$.pipe(
    filter(isOfType(AuthActionType.REGISTER)),
    switchMap(async action => {
      const { username, password } = action.payload;
      try {
        const response = await Axios.post<{ user: IUser; message: string; token: string; hasError: boolean }>(
          '/auth/register',
          {
            username,
            password,
          },
        );

        if (!!response.data.hasError) {
          throw response.data.message;
        }

        AuthServices.setToken(response.data.token);
        AuthServices.setUser(response.data.user);
        return AuthActions.authSuccess(response.data.user);
      } catch (error) {
        return AuthActions.authError(error.message);
      }
    }),
  );

const logout: Epic = actions$ =>
  actions$.pipe(
    filter(isOfType(AuthActionType.LOGOUT)),
    tap(_ => {
      AuthServices.setToken('');
      AuthServices.setUser(null);
    }),
    ignoreElements(),
  );

export const authEpics = [login, register, logout];
