import React from 'react';
import { INotification } from 'src/api/models/notification';
import { useDispatch } from 'react-redux';
import { AppActions } from 'src/redux/app/action';
import { IonIcon } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';

type Props = {
  item: INotification;
};

const Notification = (props: Props) => {
  const dispatch = useDispatch();
  const hideNotification = () => {
    dispatch(AppActions.hideNotification(props.item.id));
  };

  setTimeout(() => {
    hideNotification();
  }, props.item.duration);

  return (
    <div className="notification">
      <div className="title">
        <div>{props.item.title}</div>
        <IonIcon className="close-button" icon={closeOutline} onClick={() => hideNotification()} />
      </div>
      <div className="description">{props.item.description}</div>
    </div>
  );
};

export default Notification;
