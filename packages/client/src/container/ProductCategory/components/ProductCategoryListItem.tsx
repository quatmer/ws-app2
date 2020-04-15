import React, { useState } from 'react';
import { IonItem, IonLabel, IonText, IonList, IonIcon, IonButtons, IonButton } from '@ionic/react';
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
import { ProductCategoryNode } from 'src/api/dto/product-category.dto';
import { AppUtil } from 'src/api/utils/app.util';

type Props = { category: ProductCategoryNode; onToggle: (category: ProductCategoryNode) => void };
type State = { parentId: string | null; child?: ProductCategoryNode; showForm: boolean };
const ProductCategoryListItem = ({ category, onToggle }: Props) => {
  const [state, setState] = useState<State>({ showForm: false, parentId: null });
  const dispatch = useDispatch();

  const subcategoryCount = category.subCategories.length;
  const { productCount = 0, name } = category;

  const toggle = () => {
    onToggle(category);
    category.isSelected = !category.isSelected;
  };

  const actionButtons = (
    <IonButtons slot="end" id="action-buttons">
      {/* add button */}
      <IonButton
        fill="clear"
        color="success"
        onClick={event => {
          event.stopPropagation();
          setState({ parentId: category._id, showForm: true });
        }}>
        <IonIcon slot="icon-only" icon={add} />
      </IonButton>

      {/* edit button */}
      <IonButton
        fill="clear"
        color="tertiary"
        onClick={event => {
          event.stopPropagation();
          setState({ child: category, showForm: true, parentId: null });
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
    <TightModal
      title="new product category"
      description={`You will create new category in ${category.name} `}
      isOpen={state.showForm}
      onDidDismiss={() => setState({ showForm: false, parentId: null })}>
      <ProductCategoryEdit
        category={state.child}
        parentId={state.parentId}
        onCloseForm={() => {
          setState({ showForm: false, parentId: null });
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
  const subcategoriesList = () => (
    <div id="subcategory-list">
      <IonList>
        {category.subCategories.map(sc => {
          return <ProductCategoryListItem key={sc._id || AppUtil.getUID()} category={sc} onToggle={onToggle} />;
        })}
      </IonList>
    </div>
  );

  return (
    <div id="product-category">
      {createUpdateModal}
      <IonItem
        id="product-category-item"
        onClick={toggle}
        key={category._id || AppUtil.getUID()}
        className={classNames({ isSelected: !!category.isSelected, canClick: !!subcategoryCount })}>
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
              <IonText color="danger">{category.subCategories.map(x => x.name).join(', ')}</IonText>
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
