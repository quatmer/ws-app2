import './layout.scss';
import React, { FC } from 'react';
import { IonGrid, IonRow } from '@ionic/react';

const GridLayout: FC = props => {
  return (
    <IonGrid id="grid-layout">
      <IonRow id="grid-layout-row">{props.children}</IonRow>
    </IonGrid>
  );
};

export default GridLayout;
