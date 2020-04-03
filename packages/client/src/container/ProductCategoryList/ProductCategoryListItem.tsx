import React, { FC } from 'react';
import { IonItem, IonLabel, IonText, IonList, IonIcon } from '@ionic/react';
import { ProductCategoryDTO } from 'src/redux/product-category/reducer';
import { useDispatch } from 'react-redux';
import { ProductCategoryActions } from 'src/redux/product-category/action';
import classNames from 'classnames';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';

type Props = { category: ProductCategoryDTO };
const ProductCategoryListItem = (props: Props) => {
  const { category } = props;

  const subcategoriesList = () => (
    <div id="subcategory-list">
      <IonList>
        {category.children.map(sc => (
          <ProductCategoryListItem key={sc._id} category={sc} />
        ))}
      </IonList>
    </div>
  );

  return (
    <div id="product-category-item">
      <Item category={category} />
      {!!category.children.length && !!category.isSelected && subcategoriesList()}
    </div>
  );
};

const Item: FC<Props> = ({ category }) => {
  const dispatch = useDispatch();
  const subcategoryCount = category.children.length;
  const { productCount = 0, name } = category;

  const toggle = () => {
    dispatch(ProductCategoryActions.toggleSelect(category._id));
  };

  return (
    <IonItem
      id="product-category-item"
      onClick={toggle}
      key={category._id}
      className={classNames({ isSelected: !!category.isSelected, canClick: !!subcategoryCount })}
    >
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
      {!!subcategoryCount && (
        <IonIcon icon={!!category.isSelected ? chevronUpOutline : chevronDownOutline} slot="end" />
      )}
    </IonItem>
  );
};

export default ProductCategoryListItem;
