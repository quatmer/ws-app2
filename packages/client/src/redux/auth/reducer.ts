import { Reducer } from 'typesafe-actions';
import { AuthActionFuncType, AuthActionType } from './action';
import { IUser } from '@shared/models/user';
import { AuthUtils } from '../../api/utils/auth.util';

export type AuthStateType = {
  user: IUser | null;
};

const initialState: AuthStateType = {
  user: AuthUtils.getUser(),
};

export const authReducer: Reducer<AuthStateType, AuthActionFuncType> = (
  state = initialState,
  action,
): AuthStateType => {
  switch (action.type) {
    case AuthActionType.AUTHENTICATE: {
      return { ...state, user: action.payload.user };
    }

    case AuthActionType.LOGOUT: {
      return { ...state, user: null };
    }
    default:
      return { ...state };
  }
};
