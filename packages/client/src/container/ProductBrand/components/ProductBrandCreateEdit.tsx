import React, { useState, useEffect, useRef } from 'react';
import GridLayout from 'src/layouts/GridLayout';
import { IonCol, IonList, IonItem, IonLabel, IonText, IonInput, IonButton, IonSpinner, IonIcon } from '@ionic/react';
import { sync, createOutline } from 'ionicons/icons';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import { AppService } from 'src/api/services/app.service';
import { useDispatch } from 'react-redux';
import { IProductBrand } from '@shared/models/product-brand';
import { ProductBrandActions } from 'src/redux/product-brand/action';

type Props = {
    brand: IProductBrand;
    onCloseForm: () => void;
};
const ProductBrandCreateEdit = ( { brand, onCloseForm }: Props ) =>
{
    const { loading, error } = useTypeSelector( s => s.productBrandState );
    const [ brandName, setBrandName ] = useState( brand.name );
    const [ processType, setProcessType ] = useState<'create' | 'update'>( 'create' );
    const dispatch = useDispatch();

    useEffect( () =>
    {
        if ( !!brand )
        {
            setProcessType( 'update' );
        }
        //eslint-disable-next-line
    }, [] );

    useEffect( () =>
    {
        if ( !loading && error === null )
        {
            onCloseForm();
        } 
        //eslint-disable-next-line
    }, [ loading ] );

    const createUpdate = () =>
    {
        if ( processType === 'create' )
        {
            dispatch(
                ProductBrandActions.create( {
                    _id: AppService.getUID(),
                    name: brandName,
                } ),
            );
        }

        if ( processType === 'update' )
        {
            dispatch(
                ProductBrandActions.update( {
                    ...brand!,
                    name: brandName,
                } ),
            );
        }
    };

    return (
        <GridLayout>
            <IonCol size="12">
                <IonList>
                    <IonItem>
                        <IonLabel position="floating" color="tertiary">
                            brand name <IonText color="danger"> *</IonText>
                        </IonLabel>
                        <IonInput value={brandName} onIonChange={e => setBrandName( e.detail.value || '' )} />
                    </IonItem>
                </IonList>
            </IonCol>
            <IonCol size="12" class="content-center">
                <IonButton disabled={!brandName || loading} onClick={createUpdate} class="full-width">
                    {loading ? (
                        <IonSpinner name="dots" />
                    ) : (
                            <>
                                {processType === 'update' ? 'Update' : 'Create'}
                                <IonIcon slot="end" icon={processType === 'update' ? sync : createOutline} />
                            </>
                        )}
                </IonButton>
            </IonCol>
        </GridLayout>
    );
};

export default ProductBrandCreateEdit;
