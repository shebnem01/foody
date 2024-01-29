'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import ProfileLayout from '../components/common/ProfileLayout/ProfileLayout'
import UserProfile from '../components/ClientUser/UserProfile/UserProfile'
import UserBasket from '../components/ClientUser/UserBasket/UserBasket'
import UserOrders from '../components/ClientUser/UserOrders/UserOrders'
import UserCheckout from '../components/ClientUser/UserCheckout/UserCheckout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const user = () => {
    const router = useRouter()
    const [isShowProfile, setIsShowProfile] = useState(false)
    const [isShowBasket, setIsShowBasket] = useState(false)
    const [isShowOrders, setIsShowOrders] = useState(false)
    const [isShowCheckout, setIsShowCheckout] = useState(false)

    useEffect(() => {
        if (router.asPath === '/user?page=profile') {
            setIsShowProfile(true)
            setIsShowCheckout(false)
            setIsShowOrders(false)
            setIsShowBasket(false)
        } else if (router.asPath === '/user?page=basket') {
            setIsShowBasket(true)
            setIsShowProfile(false)
            setIsShowCheckout(false)
            setIsShowOrders(false)
        } else if (router.asPath === '/user?page=user-orders') {
            setIsShowOrders(true)
            setIsShowProfile(false)
            setIsShowBasket(false)
            setIsShowCheckout(false)
        } else if (router.asPath === '/user?page=user-checkout') {
            setIsShowOrders(false)
            setIsShowProfile(false)
            setIsShowBasket(false)
            setIsShowCheckout(true)
        }
        else {
            setIsShowOrders(false)
            setIsShowCheckout(false)
            setIsShowBasket(false)
            setIsShowProfile(false)
            router.push('/404')
        }
    }, [router.asPath])

    return (
        <>

            <ProfileLayout>
                {
                    isShowProfile ?
                        <UserProfile />
                        : isShowBasket ?
                            <UserBasket />
                            : isShowOrders ?
                                <UserOrders />
                                : isShowCheckout ?
                                    <UserCheckout />
                                    : ''
                }
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </ProfileLayout>
        </>

    )
}

export default user;
