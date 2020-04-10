import { INotification } from './../../api/models/notification';
import { Reducer } from 'typesafe-actions';
import { AppActionFuncType, AppActionType } from './action';
import { AppService } from 'src/api/services/app.service';

export type AppStateType = {
  notifications: INotification[];
};

const initialState: AppStateType = {
  notifications: [],
};

export const appReducer: Reducer<AppStateType, AppActionFuncType> = (state = initialState, action): AppStateType => {
  switch (action.type) {
    case AppActionType.SHOW_NOTIFICATION: {
      const { title, description, type, duration } = action.payload;
      const notification: INotification = {
        id: AppService.getUID(),
        type,
        title,
        description,
        duration: duration || 4000,
      };

      const notifications = [...state.notifications];
      notification.duration = notification.duration || 4000;
      notifications.push(notification);
      return { ...state, notifications };
    }
    case AppActionType.HIDE_NOTIFICATION: {
      const { id } = action.payload;
      const notifications = [...state.notifications];
      const index = notifications.findIndex(x => x.id === id);
      notifications.splice(index, 1);
      return { ...state, notifications };
    }
    default:
      return { ...state };
  }
};
