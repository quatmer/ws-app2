import React from 'react';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import Notification from './Notification';
import './NotificationContainer.scss';

const NotificationContainer = () => {
  const { notifications } = useTypeSelector(c => c.appState);

  return (
    <div className="notification-container">
      {notifications.map(notify => {
        return <Notification key={notify.id} item={notify} />;
      })}
    </div>
  );
};

export default NotificationContainer;
