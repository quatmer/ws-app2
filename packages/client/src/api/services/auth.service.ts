import { IUser } from '@shared/models/user';

export const AuthServices = {
  setToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  setUser: (user: IUser | null) => {
    if (user) {
      const userData = JSON.stringify(user);
      localStorage.setItem('user', userData);
    } else {
      localStorage.removeItem('user');
    }
  },

  getUser: (): IUser | null => {
    const userData = localStorage.getItem('user');
    return !!userData ? JSON.parse(userData) : null;
  },
};
