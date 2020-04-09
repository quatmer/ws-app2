import React from 'react';

import
{
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonIcon,
    IonButton,
} from '@ionic/react';
import { logOutSharp } from 'ionicons/icons';
import { AuthActions } from 'src/redux/auth/action';
import { useDispatch } from 'react-redux';
import ProductBrandList from 'src/container/ProductBrand/ProductBrandList';

const ProductBrandPage = () =>
{

    //const [] = useState( false );

    const dispatch = useDispatch();
    const logout = () =>
    {
        dispatch( AuthActions.logout() );
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="tertiary">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Product Brand Page</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={logout}>
                            Logout
              <IonIcon slot="end" icon={logOutSharp} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <ProductBrandList />
            </IonContent>
        </IonPage>
    );
};

export default ProductBrandPage;
