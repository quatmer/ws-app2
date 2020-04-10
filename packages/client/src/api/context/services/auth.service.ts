import { AuthUtils } from '../../utils/auth.util';
import { IUser } from '@shared/models/user';
import { AppActions } from 'src/redux/app/action';
import Axios from 'axios';
import { AuthActions } from 'src/redux/auth/action';
import { BaseService } from './base.service';

export class AuthService extends BaseService {
  login(username: string, password: string) {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ user: IUser }>('/auth/login', { username, password });
        const { user } = response.data;

        this.dispatch(AuthActions.authenticate(user));
        resolve(user);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;

        this.dispatch(
          AppActions.showNotification({
            type: 'danger',
            description: message,
            id: new Date().getTime().toString(),
            title: 'Login Error',
          }),
        );

        reject(message);
      }
    });
  }

  register(username: string, password: string) {
    return new Promise<IUser>(async (resolve, reject) => {
      try {
        const response = await Axios.post<{ user: IUser }>('/auth/register', { username, password });
        const { user } = response.data;

        this.dispatch(AuthActions.authenticate(user));
        resolve(user);
      } catch (error) {
        const message = !!error.response ? error.response.statusText : error.message;

        this.dispatch(
          AppActions.showNotification({
            type: 'danger',
            description: message,
            id: new Date().getTime().toString(),
            title: 'Register Error',
          }),
        );

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
