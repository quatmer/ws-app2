import React, { useState } from 'react'
import { IProductBrand } from '@shared/models/product-brand';
import { useDispatch } from 'react-redux';
import { IonButtons, IonButton, IonIcon } from '@ionic/react';
import { createOutline, trash } from 'ionicons/icons';
import { ProductBrandActions } from 'src/redux/product-brand/action';
import TightModal from 'src/components/TightModal';
import ProductBrandCreateEdit from './ProductBrandCreateEdit';

type Props = { brand: IProductBrand };
type State = { id: string | null, showForm: boolean };

const ProductBrandListItem = ( prop: Props ) =>
{

    const brand = prop.brand;

    const [ state, setState ] = useState<State>( { id: null, showForm: false } );
    const dispatch = useDispatch();

    const actionButtons = (
        <IonButtons slot="end" id="action-buttons">

            {/* edit button */}
            <IonButton
                fill="clear"
                color="tertiary"
                onClick={event =>
                {
                    event.stopPropagation();
                    setState( { id: prop.brand._id, showForm: true } );
                }}>
                <IonIcon slot="icon-only" icon={createOutline} />
            </IonButton>

            {/* delete button */}
            <IonButton
                fill="clear"
                color="danger"
                onClick={event =>
                {
                    event.stopPropagation();
                    dispatch( ProductBrandActions.delete( prop.brand._id ) );
                }}>
                <IonIcon slot="icon-only" icon={trash} />
            </IonButton>
        </IonButtons>
    );

    const createUpdateModal = (
        <TightModal
            title="new product brand"
            description={`Creating new brand`}
            isOpen={state.showForm}
            onDidDismiss={() => setState( { showForm: false } )}>
            <ProductBrandCreateEdit
                brand={null}
                onCloseForm={() =>
                {
                    setState( { showForm: false } );
                }}
            />
        </TightModal>
    );

    return (
        <div>

        </div>
    )
}

export default ProductBrandListItem






const getIcon = () =>
{
    if ( !subcategoryCount )
    {
        return emptyIcon;
    } else
    {
        if ( !!category.isSelected )
        {
            return chevronDownOutline;
        } else
        {
            return chevronForwardOutline;
        }
    }
};
const subcategoriesList = () => (
    <div id="subcategory-list">
        <IonList>
            {category.subCategories.map( sc =>
            {
                return <ProductCategoryListItem key={sc._id || AppService.getUID()} category={sc} onToggle={onToggle} />;
            } )}
        </IonList>
    </div>
);

return (
    <div id="product-category">
        {createUpdateModal}
        <IonItem
            id="product-category-item"
            onClick={toggle}
            key={category._id || AppService.getUID()}
            className={classNames( { isSelected: !!category.isSelected, canClick: !!subcategoryCount } )}>
            <IonIcon icon={getIcon()} slot="start" />
            <IonLabel>
                <h2>{name}</h2>
                <p>
                    has <IonText color="danger">{subcategoryCount}</IonText> subcategory and{' '}
                    <IonText color="danger">{productCount}</IonText> product
          </p>
                {/* <p>{JSON.stringify(category.isSelected)}</p> */}
                {!!subcategoryCount && !!!category.isSelected && (
                    <p>
                        <IonText color="danger">{category.subCategories.map( x => x.name ).join( ', ' )}</IonText>
                    </p>
                )}
            </IonLabel>

            {actionButtons}
        </IonItem>
        {!!category.subCategories.length && !!category.isSelected && subcategoriesList()}
    </div>
);
};

export default ProductCategoryListItem;

