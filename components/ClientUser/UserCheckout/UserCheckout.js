'use client'
import React from 'react'
import { useState } from 'react'
import ProfileLayout from '../../../components/common/ProfileLayout/ProfileLayout'
import success from '../../../assets/images/success.svg'
import styles from './usercheckout.module.css'
import Image from 'next/image'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { BounceLoader } from 'react-spinners';
import { useRef } from 'react'
import { toast } from 'react-toastify'

const index = () => {
    const [isChecked1, setIsChecked1] = useState(false)
    const [isChecked2, setIsChecked2] = useState(false)
    const [isSuccessOrder, setIsSuccessOrder] = useState(false)

    const addressInput = useRef()
    const numberInput = useRef()
    const payDoor = useRef()
    const payCard = useRef()

    const addressInputRef = addressInput.current
    const numberInputRef = numberInput.current
    const payDoorRef = payDoor.current
    const payCardRef = payCard.current

    const handleCheckbox = () => {
        setIsChecked1(true)
        setIsChecked2(false)
    }

    const handleCheckbox2 = () => {
        setIsChecked2(true)
        setIsChecked1(false)
    }

    const { mutate: checkoutOrder } = useMutation({
        mutationFn: async () => await axios.post('/api/order/add', {
            "basket_id": userBasket?.result.data.id,
            "delivery_address": addressInputRef.value,
            "payment_method": payDoorRef.checked ? "0" : payCardRef.checked ? "1" : '',
            "contact": numberInputRef.value
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }),
        onSuccess: () => {
            setIsSuccessOrder(true)
            toast.success('Products Received Successfully!')
        },
        onError: (error) => {
            setIsSuccessOrder(false)
            toast.success("Products Couldn't Received!")
        }
    })

    const { data: userBasket, isLoading } = useQuery({
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

    if (isLoading) {
        return <div className='w-full flex justify-center items-center'>
            <BounceLoader
                color="#D63626"
                loading={true}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    }

    const handleUserBasket = () => {
        const basketItems = userBasket?.result.data.items
        return basketItems?.map((basket) => (
            <div className={styles['order-item']}>
                <span><span className={styles['inner-text']}>{basket?.count}</span> x {basket?.name}</span>
                <span>${basket?.amount}</span>
            </div>
        ))
    }
    console.log(userBasket?.result.data.id);


    const handleCheckout = (e) => {
        e.preventDefault()
        checkoutOrder()
    }

    return (
        <>
            {!isSuccessOrder ?
                <>
                    <div className={styles['checkout-bg']}>
                        <h2 className={styles['checkout-text']}>Checkout</h2>
                        <div>
                            <form>
                                <div className={styles['delivery-inp']}>
                                    <label htmlFor="delivery">Delivery Address</label>
                                    <input ref={addressInput} type="text" id='delivery' placeholder='Delivery Address' />
                                </div>
                                <div className={styles['delivery-inp']}>
                                    <label htmlFor="contact">Contact Number</label>
                                    <input ref={numberInput} type="text" id='contact' placeholder='Contact number' />
                                </div>
                                <div>
                                    <label className={styles['payment-text']} htmlFor="payment">Payment Method</label>
                                    <div className='flex lg:flex-row flex-col justify-between w-5/6 mt-4'>
                                        <div className={styles['checkbox-area']}>
                                            <input ref={payDoor} onChange={(e) => handleCheckbox(e)} type="radio" id='pay' name='pay' className={styles['rounded-checkbox']} />
                                            <label className={isChecked1 ? `${styles['green-box']}` : `${styles['gray-box']}`} htmlFor="pay">pay at the door</label>
                                        </div>
                                        <div className={styles['checkbox-area']}>
                                            <input ref={payCard} onChange={(e) => handleCheckbox2(e)} type="radio" id='paycredit' name='pay' className={styles['rounded-checkbox']} />
                                            <label className={isChecked2 ? `${styles['green-box']}` : `${styles['gray-box']}`} htmlFor="paycredit">pay at the door by credit card</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-12'>
                                    <button onClick={(e) => handleCheckout(e)} className={styles['checkout-btn']}>Checkout</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={styles['order-bg']}>
                        <div className={styles['order-head']}>
                            <h3>Your Order</h3>
                        </div>
                        <div className={styles['order-mid']}>
                            {handleUserBasket()}
                            {/* <div className={styles['order-item']}>
                                <span><span className={styles['inner-text']}>1</span> x Papa John's Pizza Restaurant</span>
                                <span>$8.00</span>
                            </div>
                            <div className={styles['order-item']}>
                                <span><span className={styles['inner-text']}>1</span> x Papa John's Pizza Restaurant</span>
                                <span>$8.00</span>
                            </div>
                            <div className={styles['order-item']}>
                                <span><span className={styles['inner-text']}>1</span> x Papa John's Pizza Restaurant</span>
                                <span>$8.00</span>
                            </div>
                            <div className={styles['order-item']}>
                                <span><span className={styles['inner-text']}>1</span> x Papa John's Pizza Restaurant</span>
                                <span>$8.00</span>
                            </div>
                            <div className={styles['order-item']}>
                                <span><span className={styles['inner-text']}>1</span> x Papa John's Pizza Restaurant</span>
                                <span>$8.00</span>
                            </div> */}
                        </div>
                        <div className={styles['total-area']}>
                            <span>Total</span>
                            <span>${userBasket?.result.data.total_amount}</span>
                        </div>
                    </div>
                </>
                :
                <div className={styles['success-bg']}>
                    <div className={styles['success-area']}>
                        <Image src={success} alt='success' />
                        <span>Your order has been received</span>
                    </div>
                </div>
            }
        </>


    )
}

export default index