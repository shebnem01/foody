'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './userorders.module.css'
import dots from '../../../assets/icons/dots.svg'
import axios from 'axios'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const UserOrders = () => {
    const [isActiveModal, setIsActiveModal] = useState(false)
    const [isActiveOrderDetail, setIsActiveOrderDetail] = useState()
    const [showUserOrderModal, setShowUserModal] = useState(false)
    const queryClient = useQueryClient()

    const { mutate: delUserOrder } = useMutation({
        mutationFn: async (orderId) => await axios.delete('/api/order', {
            data: {
                order_id: orderId
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }),
        onSuccess: () => {
            toast.success('Deleted Order Successfully!')
            queryClient.invalidateQueries(["order"]);
        },
        onError: (error) => {
            toast.error("Order Couldn't Delete!")
        }
    });

    const { data: userOrder } = useQuery({
        queryKey: ['order'],
        queryFn: async () => {
            const { data } = await axios.get('/api/order/user', {
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

    const showOrderDetail = (userId) => {
        setIsActiveModal(!isActiveModal)
        setIsActiveOrderDetail(userId)
    }

    const handleDate = (orderCreatedTime) => {
        const monthNames = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let [month, date, year] = new Date(orderCreatedTime).toLocaleDateString("en-US").split("/");
        return `${date > 9 && date !== 0 ? date : 0 + date} ${monthNames[month - 1]}  ${year}`
    }

    const showUserOrder = (userOrder) => {
        setIsActiveModal(false)
        setShowUserModal(userOrder)
    }

    const closeOrderModal = () => {
        setShowUserModal(false)
    }

    const stopEvent = (e) => {
        e.stopPropagation();
    }

    const deleteUserOrder = (orderId) => {
        delUserOrder(orderId)
    }

    return (
        <>
            <div className={styles['orders-bg']}>
                <div className={styles['orders-head']}>
                    <h2>Your Orders</h2>
                </div>
                <div className={styles['table-container']}>
                    <table className={styles['table']}>
                        <thead className={styles['thead']}>
                            <tr>
                                <th>ID</th>
                                <th>Time</th>
                                <th>Delivery Address</th>
                                <th>Amount</th>
                                <th>Payment Method</th>
                                <th>Contact</th>
                            </tr>
                        </thead>
                        <tbody className={styles['tbody']}>
                            {userOrder?.result.data.map((user) => (
                                <>
                                    <tr key={user?.id} className={styles['orders-tr']}>
                                        <td><span className={styles['id-border']}>{(user?.id).slice(1, 5)}</span></td>
                                        <td>{handleDate(user?.created)}</td>
                                        <td className='w-48'>{user?.delivery_address}</td>
                                        <td>${user?.amount}</td>
                                        <td>{user?.payment_method === 1 ? "pay at the door by credit card" : "pay at the door"}</td>
                                        <td>{user?.contact}</td>
                                        <td>
                                            <button onClick={() => showOrderDetail(user?.id)} className='mr-9'>
                                                <Image src={dots} alt='dots' />
                                            </button>
                                        </td>
                                        {(isActiveOrderDetail === user?.id && isActiveModal) ?
                                            <td key={user?.id}>
                                                <div className='absolute top-10 right-4 bg-white z-50 shadow-shadoww px-6 py-1'>
                                                    <div className='flex flex-col bg-white'>
                                                        <button onClick={() => showUserOrder(user)} className='text-green-500 mb-1'>show</button>
                                                        <button onClick={() => deleteUserOrder(user?.id)} className='text-red-500'>delete</button>
                                                    </div>
                                                </div>
                                            </td>
                                            : ''
                                        }
                                    </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showUserOrderModal ?
                <div onClick={(e) => closeOrderModal(e)} className={styles['overlay']}>
                    <div onClick={(e) => stopEvent(e)} className={styles['user-order-modal']}>
                        <table>
                            <thead className={styles['modal-thead']}>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price $</th>
                                    <th>Count</th>
                                    <th>Amount</th>
                                </tr>

                            </thead>
                            <tbody className={styles["modal-tbody"]}>
                                {showUserOrderModal?.products.map((orderProduct) => (
                                    <tr>
                                        <td><Image src={orderProduct?.img_url} width={120} height={120} /></td>
                                        <td>{orderProduct?.name}</td>
                                        <td>{orderProduct?.price}</td>
                                        <td>{orderProduct?.count}</td>
                                        <td>{orderProduct?.amount}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div> : ""}

        </>
    )
}

export default UserOrders