'use client'
import React from 'react'
import styles from '../CategoryType/categorytype.module.css'
import SelectBox from '../../common/Selectbox/Selectbox'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const CategoryType = ({ pageName }) => {
    const { data } = useQuery({
        queryKey: ['restaurants'],
        queryFn: async () => {
            const { data } = await axios.get('/api/restuarants')
            return data
        },
    })
    return (

        <>
            <div className={styles['category-type-bg']}>
                <div className='flex max-md:flex-col justify-between items-center py-5 px-7'>
                    <div className='max-md:mb-4'>
                        <h2 className={styles['products-head-text']}>{pageName}</h2>
                    </div>
                    <div className='flex gap-10 items-center'>
                        {(pageName !== 'History' && pageName !== 'Geçmiş' && pageName !== 'Tarixçə') && <SelectBox categories={...data} />}
                    </div>
                </div>
            </div>
        </>

    )
}

export default CategoryType