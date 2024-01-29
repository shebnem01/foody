'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../Header/header.module.css'
import ukFlag from '../../../assets/icons/countryFlags/uk.svg';
import azeFlag from '../../../assets/icons/countryFlags/azeFlag.png';
import turkeyFlag from '../../../assets/icons/countryFlags/turkeyFlag.png';
import logo from '../../../assets/icons/logo.svg'
import plusBtn from "../../../assets/icons/plusBtn.svg"
import mobPlusBtn from '../../../assets/icons/mobPlusBtn.svg'
import admin from '../../../assets/icons/admin.svg'
import hamburger from '../../../assets/icons/hamburger.svg'
import dashboard from '../../../assets/icons/navIcons/dashIcon.svg';
import products from '../../../assets/icons/navIcons/storeIcon.svg';
import restaurants from '../../../assets/icons/navIcons/restaurant.svg';
import category from '../../../assets/icons/navIcons/category.svg'
import orders from '../../../assets/icons/navIcons/orders.svg';
import offer from '../../../assets/icons/navIcons/offer.svg';
import logout from '../../../assets/icons/navIcons/logout.svg';
import mobFoodyLogo from '../../../assets/icons/mobFoodyLogo.svg';
import leftArrow from '../../../assets/icons/leftArrow.svg';
import Image from 'next/image'
import { useDispatch } from 'react-redux';
import { openAddProductModal } from '../../../redux/features/editModalSlice';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Header = () => {
    const { t } = useTranslation('common')
    const router = useRouter()
    const currentLocale = router.locale
    const [isShowLangContain, setIsShowLangContain] = useState(false)
    const [isCurrentLang, setIsCurrentLang] = useState('en')
    const dispatch = useDispatch()

    useEffect(() => {
        setIsCurrentLang(currentLocale)
    }, [currentLocale])

    const handlelangDropDown = () => {
        setIsShowLangContain(!isShowLangContain)
    }

    const handleChangeLang = (lang) => {
        localStorage.setItem("lang", lang);
        setIsShowLangContain(false)
        setIsCurrentLang(lang)
    }

    return (
        <>
            <header>
                <div className={styles['header-bg']}>
                    <div className={styles['header-left']}>
                        <button onClick={() => openHamMenu()} className={styles['ham-menu']}>
                            <Image src={hamburger} alt="hamburger-menu" />
                        </button>
                        <a>
                            <Image src={logo} alt='logo' />
                        </a>
                    </div>

                    <div className={styles['header-right-container']}>

                        <div className={styles['header-right-first']}>
                            <button onClick={() => dispatch(openAddProductModal())} className={styles['add-product-btn']}>
                                <Image src={plusBtn} alt='plus-button' />
                                {t('Add Product')}
                            </button>

                            <button className={styles['add-product-mob-btn']}>
                                <Image src={mobPlusBtn} alt='mobile-plus-button' />
                            </button>
                        </div>

                        <div className={styles['header-right-second']}>

                            <button onClick={() => handlelangDropDown()} className={styles['first-language-btn']}>
                                <Image src={isCurrentLang === 'en' ? ukFlag : isCurrentLang === 'tr' ? turkeyFlag : isCurrentLang === 'az' ? azeFlag : ''} alt='uk-flag' />
                            </button>
                            {isShowLangContain &&
                                <div className={styles['show-flag-area']}>
                                    {isCurrentLang === 'en' ? <>
                                        <Link href='' locale='az' onClick={() => handleChangeLang('az')} className={styles['language-btn']}>
                                            <Image src={azeFlag} alt='aze-flag' />
                                        </Link>
                                        <Link href='' locale='tr' onClick={() => handleChangeLang('tr')} className={styles['language-btn']}>
                                            <Image src={turkeyFlag} alt='turkey-flag' />
                                        </Link>
                                    </> : isCurrentLang === 'tr' ?
                                        <>
                                            <Link href='' locale='en' onClick={() => handleChangeLang('en')} className={styles['language-btn']}>
                                                <Image src={ukFlag} alt='uk-flag' />
                                            </Link>
                                            <Link href='' locale='az' onClick={() => handleChangeLang('az')} className={styles['language-btn']}>
                                                <Image src={azeFlag} alt='aze-flag' />
                                            </Link>
                                        </>
                                        : isCurrentLang === 'az' ? <>
                                            <Link href='' locale='en' onClick={() => handleChangeLang('en')} className={styles['language-btn']}>
                                                <Image src={ukFlag} alt='uk-flag' />
                                            </Link>
                                            <Link href='' locale='tr' onClick={() => handleChangeLang('tr')} className={styles['language-btn']}>
                                                <Image src={turkeyFlag} alt='turkey-flag' />
                                            </Link>
                                        </> : ''
                                    }


                                </div>
                            }

                        </div>

                        <div className={styles['header-right-third']}>
                            <Image src={admin} alt='userimage' />
                            <span>Admin</span>
                        </div>

                    </div>

                </div>

                <div className={styles['navbar-container']}>

                    <div className={styles['logo-head']}>
                        <button onClick={() => closeHamMenu()}>
                            <Image src={leftArrow} alt="left-arrow" />
                        </button>
                        <Image src={mobFoodyLogo} alt="foody-logo" />
                    </div>

                    <nav>
                        <ul className={styles['mob-navbar-contain']}>
                            <li>
                                <a to='/dashboard' id={styles['mob-navbar']} className={({ isActive }) => isActive ? styles['active'] : ''}>
                                    <Image src={dashboard} alt='dashboard' />
                                    Dashboard
                                </a>
                            </li>

                            <li>
                                <a to='/products' id={styles['mob-navbar']} className={({ isActive }) => isActive ? styles['active'] : ''}>
                                    <Image src={products} alt='products' />
                                    Products
                                </a>
                            </li>

                            <li>
                                <a to='/restaurants' id={styles['mob-navbar']} className={({ isActive }) => isActive ? styles['active'] : ''}>
                                    <Image src={restaurants} alt='restaurants' />
                                    Restaurants
                                </a>
                            </li>

                            <li>
                                <a to='/category' id={styles['mob-navbar']} className={({ isActive }) => isActive ? styles['active'] : ''}>
                                    <Image src={category} alt='category' />
                                    Category
                                </a>
                            </li>

                            <li>
                                <a to='/orders' id={styles['mob-navbar']} className={({ isActive }) => isActive ? styles['active'] : ''}>
                                    <Image src={orders} alt='orders' />
                                    Orders
                                </a>
                            </li>

                            <li>
                                <a to='/offer' id={styles['mob-navbar']} className={({ isActive }) => isActive ? styles['active'] : ''}>
                                    <Image src={offer} alt='offer' />
                                    Offer
                                </a>
                            </li>

                            <li>
                                <a to='/logout' id={styles['mob-navbar']} className={styles['mob-navbar-last']}>
                                    <Image src={logout} alt='logout' />
                                    Logout
                                </a>
                            </li>

                        </ul>
                    </nav>

                </div>

            </header>
        </>
    )
}

export default Header