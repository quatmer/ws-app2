import Axios from 'axios';

export const HttpService = {
  initializeAxios: () => {
    Axios.defaults.baseURL = ' http://localhost:3000';
  },
};
