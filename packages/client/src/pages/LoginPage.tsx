import React from 'react'
import { IonCard, IonItem, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonIcon, IonLabel, IonButton, IonInput } from '@ionic/react';
import { airplaneOutline } from 'ionicons/icons';

const LoginPage = () =>
{
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Login Form</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Username</IonCardTitle>
                        <IonItem>
                            <IonInput value="Enter username ..." readonly></IonInput>
                        </IonItem>
                    </IonCardHeader>
                    <IonCardHeader>
                        <IonCardTitle>Password</IonCardTitle>
                        <IonItem>
                            <IonInput value="Enter password ..." readonly></IonInput>
                        </IonItem>
                    </IonCardHeader>

                    <IonCardContent>
                        Keep close to Nature's heart... and break clear away, once in awhile,
                        and climb a mountain or spend a week in the woods. Wash your spirit clean.
        </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonItem>
                        <IonIcon icon={airplaneOutline} slot="start" />
                        <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                        <IonButton fill="outline" slot="end">View</IonButton>
                    </IonItem>

                    <IonCardContent>
                        This is content, without any paragraph or header tags,
                        within an ion-cardContent element.
        </IonCardContent>
                </IonCard>

                <IonCard>
                    <IonItem href="#" className="ion-activated">
                        <IonIcon icon={airplaneOutline} slot="start" />
                        <IonLabel>Card Link Item 1 activated</IonLabel>
                    </IonItem>

                    <IonItem href="#">
                        <IonIcon icon={airplaneOutline} slot="start" />
                        <IonLabel>Card Link Item 2</IonLabel>
                    </IonItem>

                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage
