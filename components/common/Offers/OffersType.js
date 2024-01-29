'use client'
import React from 'react'
import styles from './offertype.module.css'

import { useDispatch } from 'react-redux';
import {  openAddOfferModal } from '../../../redux/features/editModalSlice';

const OffersType = ({pageName}) => {

    const dispatch=useDispatch();
    return (

        <>
            <div className={styles['category-type-bg']}>
                <div className='flex max-md:flex-col justify-between items-center py-5 px-7'>
                    <div className='max-md:mb-4'>
                        <h2 className={styles['products-head-text']}>{pageName}</h2>
                    </div>
                    <div className='flex gap-10 items-center'>
                        <button onClick={()=>dispatch(openAddOfferModal())} className={styles['add-category-btn']}>+Add offer</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default OffersType