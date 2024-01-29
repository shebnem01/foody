import Image from 'next/image'
import React from 'react'
import styles from './userbasket.module.css'
import basketIcon from '../../../assets/icons/basket.svg'
import foods from '../../../assets/icons/foods.svg'
import delIcon from '../../../assets/icons/delIcon.svg'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const UserBasket = () => {

    const queryClient = useQueryClient()

    const { mutate: addProductToBasket } = useMutation({
        mutationFn: async (productId) => await axios.post('/api/basket/add', {
            product_id: productId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }),
        onSuccess: (data) => {
            console.log(data);
            // alert('success')
            queryClient.invalidateQueries(["basket"]);
        },
        onError: (error) => {
            alert('error', error)
        }
    })

    const { data: userBasket } = useQuery({
        queryKey: ['basket'],
        queryFn: async () => {
            const { data } = await axios.get('/api/basket', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            }, {
                onSuccess: (data) => {
                    console.log(data);
                }
            })
            return data
        },
    })

    const { mutate: delProductToBasket } = useMutation({
        mutationFn: async (productId) => await axios.delete('/api/basket/delete', {
            data: {
                product_id: productId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }),
        onSuccess: () => {
            // alert('success')
            queryClient.invalidateQueries(["basket"]);
        },
        onError: (error) => {
            console.log(error);
            alert('error', error)
        }
    });

    const { mutate: clearBasket } = useMutation({
        mutationFn: async (basketId) => await axios.delete('/api/basket/clear', {
            data: {
                basket_id: basketId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }),
        onSuccess: () => {
            // alert('success')
            queryClient.invalidateQueries(["basket"]);
        },
        onError: (error) => {
            console.log(error);
            alert('error', error)
        }
    });


    const increaseProductCount = (productId) => {
        addProductToBasket(productId)
    }

    const decreaseProductCount = (productId) => {
        // singInUser()
        delProductToBasket(productId)
    }

    const handleClearBasket = (basketId) => {
        clearBasket(basketId)
    }

    const handleUserBasket = () => {
        const basketItems = userBasket?.result.data.items
        return basketItems?.map((basket) => (
            <div key={basket?.id} className={styles['basket-card']}>
                <div className='flex items-center'>
                    <div className='mr-7'>
                        <Image className={styles.img} src={basket?.img_url} width={200} height={200} alt='food' />
                    </div>
                    <div className={styles['food-head']}>
                        <h3>{basket?.name}</h3>
                        <span>${basket?.price}</span>
                    </div>
                </div>
                <div className='flex'>
                    <div className='flex flex-col mr-5 lg:bg-white bg-gray-200 px-3 rounded-2xl h-20'>
                        <button onClick={() => increaseProductCount(basket?.id)}>+</button>
                        <span className='font-bold'>{basket?.count}</span>
                        <button onClick={() => decreaseProductCount(basket?.id)}>-</button>
                    </div>
                    {/* <div>
                        <button className='-mt-2'>
                            <Image src={delIcon} alt='delete' />
                        </button>
                    </div> */}
                </div>
            </div>
        ))
    }

    return (
        <>
            <div className={styles['basket-bg']}>

                <div className={styles['basket-head']}>
                    <h2>Your Basket</h2>
                    <div className='flex items-center justify-between'>
                        <div className='flex'>
                            <Image className='mr-2' src={basketIcon} alt='basket' />
                            <span className={styles['basket-items']} onClick={() => addBasket()}>{userBasket?.result.data.total_item} items</span>
                        </div>
                        <div>
                            <button onClick={() => handleClearBasket(userBasket?.result.data.id)} className={styles['clear-btn']}>Clear All</button>
                        </div>
                    </div>
                </div>

                <div className={styles['basket-cards-container']}>
                    {handleUserBasket()}
                    {/* <div className={styles['basket-card']}>
                        <div className='flex items-center'>
                            <div className='mr-7'>
                                <Image src={foods} alt='food' />
                            </div>
                            <div className={styles['food-head']}>
                                <h3>Papa John’s Pizza Restaurant</h3>
                                <span>$15.80</span>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col mr-5 bg-white px-3 rounded-2xl'>
                                <button>+</button>
                                <span className='font-bold'>2</span>
                                <button>-</button>
                            </div>
                            <div>
                                <button className='-mt-2'>
                                    <Image src={delIcon} alt='delete' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles['basket-card']}>
                        <div className='flex items-center'>
                            <div className='mr-7'>
                                <Image src={foods} alt='food' />
                            </div>
                            <div className={styles['food-head']}>
                                <h3>Papa John’s Pizza Restaurant</h3>
                                <span>$15.80</span>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col mr-5 bg-white px-3 rounded-2xl'>
                                <button>+</button>
                                <span className='font-bold'>2</span>
                                <button>-</button>
                            </div>
                            <div>
                                <button className='-mt-2'>
                                    <Image src={delIcon} alt='delete' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles['basket-card']}>
                        <div className='flex items-center'>
                            <div className='mr-7'>
                                <Image src={foods} alt='food' />
                            </div>
                            <div className={styles['food-head']}>
                                <h3>Papa John’s Pizza Restaurant</h3>
                                <span>$15.80</span>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='flex flex-col mr-5 bg-white px-3 rounded-2xl'>
                                <button>+</button>
                                <span className='font-bold'>2</span>
                                <button>-</button>
                            </div>
                            <div>
                                <button className='-mt-2'>
                                    <Image src={delIcon} alt='delete' />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles['basket-card']}>
                        <div className='flex items-center'>
                            <div className='mr-7'>
                                <Image src={foods} alt='food' />
                            </div>
                            <div className={styles['food-head']}>
                                <h3>Papa John’s Pizza Restaurant</h3>
                                <span>$15.80</span>
                            </div>
                        </div>

                        <div className='flex '>
                            <div className='flex flex-col mr-5 bg-white px-3 rounded-2xl'>
                                <button>+</button>
                                <span className='font-bold'>2</span>
                                <button>-</button>
                            </div>
                            <div>
                                <button className='-mt-2'>
                                    <Image src={delIcon} alt='delete' />
                                </button>
                            </div>
                        </div>
                    </div> */}

                </div>

                <div className='mx-9'>
                    <div className={styles['checkout-bg']}>
                        <span>Checkout</span>
                        <div>
                            ${(userBasket?.result.data.total_amount)}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserBasket