'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ClientContainer from '../ClientContainer/ClientContainer'
import styles from './profilelayout.module.css'
import profile from '../../../assets/icons/profile.svg'
import basketIcon from '../../../assets/icons/basketIcon.svg'
import basket from '../../../assets/icons/basket.svg'
import { useRouter } from 'next/router'

const ProfileLayout = ({ children }) => {

    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem('access_token')
    }

    return (
        <ClientContainer>
            <section className='mt-4 lg:mb-44'>
                <div className='flex lg:flex-row flex-col-reverse'>
                    <div className={styles['profile-nav']}>
                        <nav>
                            <ul>
                                <li className='mb-3'>
                                    <Link className={router.asPath === '/user?page=profile' ? `${styles['nav-link']} ${styles['nav-active']}` : `${styles['nav-link']}`} href='/user?page=profile'>
                                        <Image className='mr-3' src={profile} alt='profile' />
                                        Profile
                                    </Link>
                                </li>
                                <li className='mb-3'>
                                    <Link className={router.asPath === '/user?page=basket' ? `${styles['nav-link']} ${styles['nav-active']}` : `${styles['nav-link']}`} href='/user?page=basket'>
                                        <Image className='mr-3' src={router.asPath === '/user?page=basket' ? basket : basketIcon} alt='basket-icon' />
                                        Your Basket
                                    </Link>
                                </li>
                                <li className='mb-3'>
                                    <Link className={router.asPath === '/user?page=user-orders' ? `${styles['nav-link']} ${styles['nav-active']}` : `${styles['nav-link']}`} href='/user?page=user-orders'>
                                        <Image className='mr-3' src={router.asPath === '/user?page=user-orders' ? basket : basketIcon} alt='basket-icon' />
                                        Your Orders
                                    </Link>
                                </li>
                                <li className='mb-3'>
                                    <Link className={router.asPath === '/user?page=user-checkout' ? `${styles['nav-link']} ${styles['nav-active']}` : `${styles['nav-link']}`} href='/user?page=user-checkout'>
                                        <Image className='mr-3' src={router.asPath === '/user?page=user-checkout' ? basket : basketIcon} alt='basket-icon' />
                                        Checkout
                                    </Link>
                                </li>
                                <li className='mb-3'>
                                    <Link onClick={() => handleLogout()} className={`${styles['nav-link']}`} href='/'>
                                        <Image className='mr-3' src={basketIcon} alt='logout' />
                                        Logout
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {children}
                </div>

            </section>
        </ClientContainer>
    )
}

export default ProfileLayout