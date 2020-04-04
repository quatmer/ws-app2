import { HttpService } from './http.service';
import { v4 } from 'uuid';
export const AppService = {
  initApp: () => {
    HttpService.initializeAxios();
    HttpService.startLogging();
  },

  getUID: () => {
    return v4();
  },
};
