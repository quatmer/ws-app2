import { HttpService } from './http.service';
import { v4 } from 'uuid';
import { AuthService } from '../context/services/auth.service';
export const AppService = {
  initApp: (Auth: AuthService) => {
    HttpService.initializeAxios();
    HttpService.startLogging();
    HttpService.checkToken(Auth);
  },

  getUID: () => {
    return v4();
  },
};
