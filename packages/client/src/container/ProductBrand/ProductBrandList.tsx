import React, { useEffect, useState } from 'react';
import { useTypeSelector } from 'src/redux/helper/selector.helper';
import { useDispatch } from 'react-redux';
import Loading from 'src/components/Loading';
import { ProductBrandActions } from 'src/redux/product-brand/action';
import ProductBrandListItem from './components/ProductBrandListItem';
import { IProductBrand } from '@shared/models/product-brand';

const ProductBrandList = () =>
{
    const { loading } = useTypeSelector( c => c.productBrandState );
    const [ brands ] = useState<IProductBrand[]>( [] );
    const dispatch = useDispatch();

    useEffect( () =>
    {
        dispatch( ProductBrandActions.getList() ); ""
        // eslint-disable-next-line
    }, [] );

    return loading ? (
        <Loading />
    ) : (
            <div id="product-brand-list">
                {brands.map( b =>
                {
                    return <ProductBrandListItem key={b._id} brand={b} />;
                } )}
            </div>
        );

};

export default ProductBrandList;
