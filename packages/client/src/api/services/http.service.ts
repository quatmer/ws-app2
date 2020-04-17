import Axios from 'axios';
import { AuthUtils } from '../utils/auth.util';
import { AuthService } from '../context/services/auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';

export const HttpService = {
  initializeAxios: () => {
    Axios.defaults.baseURL = ' http://localhost:3000';
    Axios.defaults.headers.common['auth'] = AuthUtils.getToken();
  },

  checkToken: (Auth: AuthService) => {
    Axios.interceptors.response.use(
      response => {
        const token = response.headers['auth'];
        if (token) {
          AuthUtils.setToken(token);
          Axios.defaults.headers.common['auth'] = AuthUtils.getToken();
        }

        const firebaseToken = response.headers['fire-auth'];
        if (firebaseToken) {
          firebase
            .auth()
            .signInWithCustomToken(firebaseToken)
            .then(value => console.log('Firebase signIn response : ', value))
            .catch(error => console.log('Error in Firebase signIn :', error));
        }

        return response;
      },
      error => {
        if (!!error.response && error.response.status === 401) {
          Auth.logout();
        }

        // return Error object with Promise
        return Promise.reject(error);
      },
    );
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
