import { IUser } from '../../../../shared/models/user';
import { Reducer } from 'typesafe-actions';
import { AuthActionFuncType, AuthActionType } from './action';
import { AuthServices } from 'src/api/services/auth.service';

export type AuthStateType = {
  loading: boolean;
  user: IUser | null;
  error: string | null;
};

const initialState: AuthStateType = {
  loading: false,
  user: AuthServices.getUser(),
  error: null,
};

export const authReducer: Reducer<AuthStateType, AuthActionFuncType> = (
  state = initialState,
  action,
): AuthStateType => {
  switch (action.type) {
    case AuthActionType.LOGIN: {
      return { ...state, loading: true, user: null, error: null };
    }
    case AuthActionType.REGISTER: {
      return { ...state, loading: true, user: null, error: null };
    }
    case AuthActionType.AUTH_SUCCESS: {
      const { user } = action.payload;
      return { ...state, loading: false, user: user, error: null };
    }
    case AuthActionType.AUTH_FAILED: {
      const { message } = action.payload;
      return { ...state, loading: false, user: null, error: message };
    }

    case AuthActionType.LOGOUT: {
      return { ...state, loading: false, user: null, error: null };
    }
    default:
      return { ...state };
  }
};
