import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';
import { IUser } from '@shared/models/user';

export enum AuthActionType {
  AUTHENTICATE = '[auth]: AUTHENTICATE',
  LOGOUT = '[auth]: LOGOUT',
}

export const AuthActions = {
  authenticate: (user: IUser) => action(AuthActionType.AUTHENTICATE, { user }),
  logout: () => action(AuthActionType.LOGOUT),
};

export type AuthActionFuncType = ActionsUnion<typeof AuthActions>;
