import { v4 } from 'uuid';
import { AuthService } from '../context/services/auth.service';
import { HttpService } from '../services/http.service';
import { notification } from 'antd';

export const AppUtil = {
  initApp: (Auth: AuthService) => {
    HttpService.initializeAxios();
    HttpService.startLogging();
    HttpService.checkToken(Auth);
  },

  getUID: () => {
    return v4();
  },

  showNotification: (type: NotificationType, message: string, description: string, duration?: number) => {
    notification[type]({
      message,
      description,
      duration,
    });
  },
};

export type NotificationType = 'info' | 'warning' | 'success' | 'error';
