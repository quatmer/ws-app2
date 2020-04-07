import { Reducer } from 'typesafe-actions';
import { AuthActionFuncType, AuthActionType } from './action';
import { AuthServices } from 'src/api/services/auth.service';
import { IUser } from '@shared/models/user';

export type AuthStateType = {
  user: IUser | null;
};

const initialState: AuthStateType = {
  user: AuthServices.getUser(),
};

export const authReducer: Reducer<AuthStateType, AuthActionFuncType> = (
  state = initialState,
  action,
): AuthStateType => {
  switch (action.type) {
    case AuthActionType.AUTHENTICATE: {
      const { user } = action.payload;
      return { ...state, user: user };
    }

    case AuthActionType.LOGOUT: {
      return { ...state, user: null };
    }
    default:
      return { ...state };
  }
};
