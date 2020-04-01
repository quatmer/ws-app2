import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IUser } from '../../../../shared/models/user';

export enum AuthActionType {
  LOGIN = '[auth]: LOGIN',
  REGISTER = '[auth]: REGISTER',
  AUTH_SUCCESS = '[auth]:AUTH_SUCCESS',
  AUTH_FAILED = '[auth]: AUTH_FAILED',
  LOGOUT = '[auth]: LOGOUT',
}

export const AuthActions = {
  login: (username: string, password: string) => action(AuthActionType.LOGIN, { username, password }),
  register: (username: string, password: string) => action(AuthActionType.REGISTER, { username, password }),
  authSuccess: (user: IUser) => action(AuthActionType.AUTH_SUCCESS, { user }),
  authError: (message: string) => action(AuthActionType.AUTH_FAILED, { message }),
  logout: () => action(AuthActionType.LOGOUT),
};

export type AuthActionFuncType = ActionsUnion<typeof AuthActions>;
