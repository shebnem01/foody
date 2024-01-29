import Image from 'next/image'
import Link from 'next/link'
import styles from './clientfooter.module.css'

import foodyLogo from '../../../assets/icons/foodyLogo.svg'
import facebook from '../../../assets/icons/social/facebook.svg'
import instagram from '../../../assets/icons/social/instagram.svg'
import twitter from '../../../assets/icons/social/twitter.svg'

import React from 'react'

const ClientFooter = () => {
    return (
        <>
            <footer>
                <div className={styles['footer-bg']}>
                    <div>
                        <div className={styles['footer-top']}>
                            <div className={styles['footer-left']}>
                                <h2 className={styles.logo}>
                                    <Image src={foodyLogo} alt='foody-logo' />
                                </h2>
                                <span>
                                    Lorem ipsum is placeholder text commonly used in the graphic,
                                </span>
                                <div className={styles['footer-social']}>
                                    <Link href='https://facebook.com/'>
                                        <Image src={facebook} alt='facebook' />
                                    </Link>
                                    <Link href='https://instagram.com/'>
                                        <Image src={instagram} alt='instagram' />
                                    </Link>
                                    <Link href='https://twitter.com/'>
                                        <Image src={twitter} alt='twitter' />
                                    </Link>
                                </div>
                            </div>
                            <div className={styles['footer-right']}>
                                <nav className='flex lg:flex-row flex-col mt-3'>
                                    <ul className='flex flex-col lg:mr-24'>
                                        <li className='font-black text-lg'>
                                            <Link href='/'>Popular</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Programming</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Books for children</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Psychology</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Business</Link>
                                        </li>
                                    </ul>
                                    <ul className='flex flex-col lg:mr-24'>
                                        <li className='font-black text-lg'>
                                            <Link href='/'>Cash</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Delivery</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Payment</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>About the store</Link>
                                        </li>
                                    </ul>
                                    <ul className='flex flex-col lg:mr-24'>
                                        <li className='font-black text-lg'>
                                            <Link href='/'>Help</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Contracts</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Purchase returns</Link>
                                        </li>
                                        <li className={styles['nav-text']}>
                                            <Link href='/'>Buyer help</Link>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>

                        <div className='flex justify-center text-white mt-14'>
                            <span className={styles.copyright}>All rights reserved © 2003-2023 Foody TERMS OF USE | Privacy Policy</span>
                        </div>

                    </div>
                </div>
            </footer>
        </>
    )
}

export default ClientFooter