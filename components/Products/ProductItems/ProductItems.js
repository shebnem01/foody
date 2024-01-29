'use client'
import React from 'react'
import ProductItem from '../ProductItems/ProductItem/ProductItem'
import ProductItemsContainer from '../../../components/common/ProductItemsContainer/ProductsItemsContainer'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

const ProductItems = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await axios.get('/api/products')
            return data
        },
    })


    if (isLoading) {
        return <div className='flex justify-center items-center mx-0 my-auto'>
            <BounceLoader
                color="#C74FEB"
                loading={true}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }
    if (isError) return <div className='text-white'>error...</div>

    return (
        <>
            <ProductItemsContainer>
                <ProductItem productsData={...data} />
            </ProductItemsContainer>
        </>
    )
}

export default ProductItems