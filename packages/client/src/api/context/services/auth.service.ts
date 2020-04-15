import { AppUtil } from './../../utils/app.util';
import { AuthUtils } from '../../utils/auth.util';
import { IUser } from '@shared/models/user';
import Axios from 'axios';
import { BaseService } from './base.service';
import { AuthActions } from '../../../redux/auth/action';

export class AuthService extends BaseService {
  login(username: string, password: string) {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ user: IUser; token: string }>('/auth/login', { username, password });
        const { user, token } = response.data;

        AuthUtils.setToken(token);
        AuthUtils.setUser(user);

        this.dispatch(AuthActions.authenticate(user));
        resolve(user);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;

        AppUtil.showNotification('error', 'Login Error', message);

        reject(message);
      }
    });
  }

  register(username: string, password: string) {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ user: IUser; token: string }>('/auth/register', { username, password });
        const { user, token } = response.data;

        AuthUtils.setToken(token);
        AuthUtils.setUser(user);

        this.dispatch(AuthActions.authenticate(user));
        resolve(user);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;
        AppUtil.showNotification('error', 'Register Error', message);

        reject(message);
      }
    });
  }

  logout() {
    AuthUtils.setToken('');
    AuthUtils.setUser(null);
    this.dispatch(AuthActions.logout());
  }
}
