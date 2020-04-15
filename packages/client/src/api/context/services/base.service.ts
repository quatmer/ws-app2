import { Dispatch } from 'react';
export class BaseService {
  constructor(public dispatch: Dispatch<any>) {
    //console.log('Auth SERVICE init');
  }
}
