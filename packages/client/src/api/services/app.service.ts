import { HttpService } from './http.service';

export const AppService = {
  initApp: () => {
    HttpService.initializeAxios();
    HttpService.startLogging();
  },
};
