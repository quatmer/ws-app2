import { Dispatch } from 'react';
import { AppActions } from 'src/redux/app/action';
import Axios from 'axios';
import { IUser } from '@shared/models/user';
import { IErrorResponse } from '@shared/models/error-response';
import { AuthServices } from 'src/api/services/auth.service';
import { ProductCategoryActions } from 'src/redux/product-category/action';
import { AuthActions } from 'src/redux/auth/action';

export class AuthService {
  dispatch: Dispatch<any>;
  counter = 0;
  constructor(dispatch: Dispatch<any>) {
    console.log('[AuthServices]: init', dispatch);
    this.dispatch = dispatch;
  }

  public async login(username: string, password: string) {
    if (!username || !password) {
      this.dispatch(AppActions.showNotification({ type: 'warning', description: 'missing info' }));
      return;
    }

    try {
      const response = await Axios.post<{ user: IUser; token: string } & IErrorResponse>('/auth/login', {
        username,
        password,
      });

      if (!!response.data.hasError) {
        throw response.data.message;
      }
      const { user, token } = response.data;

      AuthServices.setToken(token);
      AuthServices.setUser(user);
      this.dispatch(AuthActions.authenticate(user));
    } catch (error) {
      this.dispatch(AppActions.showNotification({ type: 'danger', description: error.message }));
    }
  }

  public async register(username: string, password: string) {
    if (!username || !password) {
      this.dispatch(AppActions.showNotification({ type: 'warning', description: 'missing info' }));
      return;
    }

    try {
      const response = await Axios.post<{ user: IUser; token: string } & IErrorResponse>('/auth/register', {
        username,
        password,
      });

      if (!!response.data.hasError) {
        throw response.data.message;
      }

      const { user, token } = response.data;

      AuthServices.setToken(token);
      AuthServices.setUser(user);
      this.dispatch(AppActions.showNotification({ type: 'information', description: 'Account created successfully.' }));
      this.dispatch(AuthActions.authenticate(user));
    } catch (error) {
      this.dispatch(AppActions.showNotification({ type: 'danger', description: error.message }));
    }
  }

  public logout() {
    console.log('AuthService logout...');

    console.log(this.counter);

    AuthServices.setToken('');
    AuthServices.setUser(null);
    this.dispatch(AuthActions.logout());
  }
}
