import { action } from 'typesafe-actions';
import { ActionsUnion } from '../helper/type.helper';

export enum AppActionType {
  SHOW_NOTIFICATION = '[app]: SHOW_NOTIFICATION',
  HIDE_NOTIFICATION = '[app]: HIDE_NOTIFICATION',
}

export const AppActions = {
  showNotification: (
    title: string,
    description: string,
    type: 'danger' | 'warning' | 'information',
    duration?: number,
  ) => action(AppActionType.SHOW_NOTIFICATION, { title, description, type, duration }),
  hideNotification: (id: string) => action(AppActionType.HIDE_NOTIFICATION, { id }),
};

export type AppActionFuncType = ActionsUnion<typeof AppActions>;
