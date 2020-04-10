import React, { useEffect, useState } from 'react'
import { useTypeSelector } from 'src/redux/helper/selector.helper'
import BrandListItem from './components/BrandListItem';

import './BrandList.scss'
import NewBrand from './components/NewBrand';
import { IonSpinner } from '@ionic/react';
import { useServices } from 'src/api/context/ServiceContext';
const BrandList = () => {
  const { brands } = useTypeSelector(x => x.brandState);
  const { brandService } = useServices();
  const [loading, setLoading] = useState(false)
  const [delayed, setDelayed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayed(true)
    }, 400);

    setLoading(true);
    brandService.getList().then(() => setLoading(false)).catch(() => setLoading(false))
    return () => {
      clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className='brand'>
      <div className='title'>
        {loading && delayed ? <IonSpinner /> : <></>}
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