import React, { FC, useState } from 'react';
import { IonItem, IonLabel, IonText, IonList, IonIcon, IonButtons, IonButton } from '@ionic/react';
import { ProductCategoryDTO } from 'src/redux/product-category/reducer';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from 'src/redux/product-category/action';
import classNames from 'classnames';
import {
  chevronDownOutline,
  chevronForwardOutline,
  createOutline,
  trash,
  add,
  remove as emptyIcon,
} from 'ionicons/icons';
import TightModal from 'src/components/TightModal';
import ProductCategoryEdit from './ProductCategoryEdit';
import { AppService } from 'src/api/services/app.service';

type Props = { category: ProductCategoryDTO };
const ProductCategoryListItem = ({ category }: Props) => {
  const subcategoriesList = () => (
    <div id="subcategory-list">
      <IonList>
        {category.children.map(sc => {
          return <ProductCategoryListItem key={sc._id || AppService.getUID()} category={sc} />;
        })}
      </IonList>
    </div>
  );

  return (
    <div id="product-category">
      <Item category={category} />
      {!!category.children.length && !!category.isSelected && subcategoriesList()}
    </div>
  );
};

type State = { parent?: ProductCategoryDTO; child?: ProductCategoryDTO; showForm: boolean };
const Item: FC<Props> = ({ category }) => {
  const [state, setState] = useState<State>({ showForm: false });

  const dispatch = useDispatch();

  const subcategoryCount = category.children.length;
  const { productCount = 0, name } = category;

  const toggle = () => {
    if (category._id) {
      dispatch(ProductCategoryActions.toggleSelect(category._id));
    }
  };

  const actionButtons = (
    <IonButtons slot="end" id="action-buttons">
      {/* add button */}
      <IonButton
        fill="clear"
        color="success"
        onClick={event => {
          event.stopPropagation();
          setState({ parent: category, showForm: true });
        }}>
        <IonIcon slot="icon-only" icon={add} />
      </IonButton>

      {/* edit button */}
      <IonButton
        fill="clear"
        color="tertiary"
        onClick={event => {
          event.stopPropagation();
          setState({ child: category, showForm: true });
        }}>
        <IonIcon slot="icon-only" icon={createOutline} />
      </IonButton>
      {/* delete button */}
      <IonButton
        fill="clear"
        color="danger"
        onClick={event => {
          event.stopPropagation();
          dispatch(ProductCategoryActions.delete(category._id));
        }}>
        <IonIcon slot="icon-only" icon={trash} />
      </IonButton>
    </IonButtons>
  );

  const createUpdateModal = (
    <TightModal title="new product category" isOpen={state.showForm} onDidDismiss={() => setState({ showForm: false })}>
      <ProductCategoryEdit
        parentCategory={state.parent}
        category={state.child}
        onCloseForm={() => {
          setState({ showForm: false });
        }}
      />
    </TightModal>
  );

  const getIcon = () => {
    if (!subcategoryCount) {
      return emptyIcon;
    } else {
      if (!!category.isSelected) {
        return chevronDownOutline;
      } else {
        return chevronForwardOutline;
      }
    }
  };
  return (
    <>
      {createUpdateModal}
      <IonItem
        id="product-category-item"
        onClick={toggle}
        key={category._id || AppService.getUID()}
        className={classNames({ isSelected: !!category.isSelected, canClick: !!subcategoryCount })}>
        <IonIcon icon={getIcon()} slot="start" />
        <IonLabel>
          <h2>{name}</h2>
          <p>
            has <IonText color="danger">{subcategoryCount}</IonText> subcategory and{' '}
            <IonText color="danger">{productCount}</IonText> product
          </p>
          {!!subcategoryCount && !!!category.isSelected && (
            <p>
              <IonText color="danger">{category.children.map(x => x.name).join(', ')}</IonText>
            </p>
          )}
        </IonLabel>

        {actionButtons}
      </IonItem>
    </>
  );
};

export default ProductCategoryListItem;
