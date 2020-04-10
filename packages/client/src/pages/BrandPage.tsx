import React from 'react'
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent } from '@ionic/react'
import BrandList from 'src/container/Brand/BrandList'

const BrandPage = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Brands</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <BrandList />
      </IonContent>
    </IonPage>
  )
}

export default BrandPage