import React, { useEffect } from 'react'
import { useTypeSelector } from 'src/redux/helper/selector.helper'
import { useDispatch } from 'react-redux';
import { BrandActions } from 'src/redux/brand/action';
import BrandListItem from './components/BrandListItem';

import './BrandList.scss'
import NewBrand from './components/NewBrand';
import { IonSpinner } from '@ionic/react';
const BrandList = () => {
  const { brands, loading } = useTypeSelector(x => x.brandState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(BrandActions.getList());
    // eslint-disable-next-line
  }, [])

  return (
    <div className='brand'>
      <div className='title'>
        {loading ? <IonSpinner /> : <></>}
        <h3>List of Brand</h3>
      </div>
      <h6><strong>Brands</strong> are added to products for categorization purpose</h6>
      <NewBrand />
      <div className='table-header'>Name</div>
      {brands.map(item => {
        return <BrandListItem key={item._id} brand={item} />
      })}
    </div>
  )
}

export default BrandList
