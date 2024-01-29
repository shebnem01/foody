import React, { useState } from 'react'
import styles from '../../../Products/ProductItems/ProductItem/productitem.module.css'
import editImg from '../../../../assets/icons/edit.svg';
import trashImg from '../../../../assets/icons/trash.svg';
import { openModalEdit } from '../../../../redux/features/editModalSlice';
import { openDelModal } from '../../../../redux/features/delModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "framer-motion";
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProductItem = ({ productsData }) => {
    const { data } = productsData?.result

    const dispatch = useDispatch()
    const selActiveProductCategory = useSelector((state) => state.product.isActiveProductCategory)
    const router = useRouter()

    const { data: restData } = useQuery({
        queryKey: ['restaurants'],
        queryFn: async () => {
            const { data } = await axios.get('/api/restuarants')
            return data
        },
    })

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    useEffect(() => {
        router.push(`/admin/products`)
    },[])

    const handleRestName = (productID) => {
        return restData?.result.data.filter((rest) => rest.id === productID)[0]?.name
    }

    const handleProdutData = () => {
        if (selActiveProductCategory) {
            const filteredProducts = data?.filter((product) => product.rest_id === selActiveProductCategory.id)
            return filteredProducts?.map((product) => (
                <motion.div
                    key={product?.id}
                    className={styles["product-bg"]}
                    variants={item}
                >
                    <div className={styles['product-detail']}>
                        <div>
                            {product?.img_url && <Image src={product.img_url} className='px-2 object-cover w-[160px] h-[160px]' width={160} height={160} alt='pizza' />}
                        </div>
                        <h3>{product?.name}</h3>
                        <span>{handleRestName(product?.rest_id)}</span>
                        <div className={styles['product-price']}>
                            <div>
                                <span>${product?.price}</span>
                            </div>
                            <div className={styles['product-edit']}>
                                <button onClick={() => dispatch(openModalEdit(product))}>
                                    <Image src={editImg} alt='edit' />
                                </button>
                                <button onClick={() => dispatch(openDelModal(product?.id))}>
                                    <Image src={trashImg} alt='trash' />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))
        } else {
            return data?.map((product, i) => (
                <motion.div
                    key={product?.id}
                    className={styles["product-bg"]}
                    variants={item}
                >
                    <div className={styles['product-detail']}>
                        <div>
                            {product?.img_url && <Image src={product.img_url} className='px-2 object-cover w-[160px] h-[160px]' width={160} height={160} alt='pizza' />}
                        </div>
                        <h3>{(product?.name).length > 14 ? (product?.name).slice(0, 14) + "..." : product?.name}</h3>
                        <span>{handleRestName(product?.rest_id)}</span>
                        <div className={styles['product-price']}>
                            <div>
                                <span>${product?.price}</span>
                            </div>
                            <div className={styles['product-edit']}>
                                <button onClick={() => dispatch(openModalEdit(product))}>
                                    <Image src={editImg} alt='edit' />
                                </button>
                                <button onClick={() => dispatch(openDelModal(product?.id))}>
                                    <Image src={trashImg} alt='trash' />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))
        }

    }

    return (
        <>
            {
                handleProdutData()
            }
        </>
    )
}

export default ProductItem