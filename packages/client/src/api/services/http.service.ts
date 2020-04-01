import Axios from 'axios';

export const HttpService = {
  initializeAxios: () => {
    Axios.defaults.baseURL = ' http://localhost:3000';
  },

  startLogging: () => {
    Axios.interceptors.request.use(request => {
      console.log(
        `%cRequest: ${request.method} ${request.baseURL}${request.url}`,
        `color: red; font-weight: bold;`,
        request.data,
      );
      return request;
    });
    Axios.interceptors.response.use(response => {
      console.log(
        `%cResponse: ${response.config.method} ${response.config.baseURL}${response.config.url}`,
        `color: green; font-weight: bold;`,
        { status: response?.status, text: response?.statusText },
        response.data,
      );
      return response;
    });
  },
};
