import React, { useEffect } from 'react'
import Image from 'next/image'
import littleHam from '../../assets/images/foodImages/littleHam.svg'
import stars from '../../assets/images/stars.svg'
import aboutBg from '../../assets/images/about-bg.svg'
import ClientContainer from '../../components/common/ClientContainer/ClientContainer'
import littlePizzas from '../../assets/images/foodImages/littlePizzas.svg'
import soup from '../../assets/images/foodImages/soup.svg'
import coffee from '../../assets/images/foodImages/coffe.svg'
import styles from './aboutus.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next'

const index = () => {
    const { t } = useTranslation('common')

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <>
            <title>Foody | About-us</title>
            <ClientContainer>
                <section className='lg:mt-28 lg:mx-24 m-10 flex lg:flex-row flex-col justify-between'>
                    <div className='lg:w-2/4 w-full lg:mr-20 mb-4' data-aos='fade-right'>
                        <h2 className={styles['about-head']}>{t('About Us')}</h2>
                        <p className={styles['about-para']}>
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                        </p>
                    </div>
                    <div className={styles['about-bg']} data-aos='fade-left'>
                        <Image className='lg:block hidden ' src={aboutBg} />
                        <div className={styles['about-card']}>
                            <div className='relative'>
                                <Image className='absolute -top-14 right-4  xl:w-auto w-20' src={littleHam} alt='hamburger' />
                            </div>
                            <div className={styles['about-card-text']}>
                                <h3>Hamburger</h3>
                                <Image src={stars} alt='stars' />
                                <span>$5.90</span>
                            </div>
                        </div>
                        <div className={styles['about-card-2']}>
                            <div className='relative'>
                                <Image className='absolute -top-14 right-4' src={littlePizzas} alt='hamburger' />
                            </div>
                            <div className={styles['about-card-text']}>
                                <h3>Sousage Pizza</h3>
                                <Image src={stars} alt='stars' />
                                <span>$7.90</span>
                            </div>
                        </div>
                        <div className={styles['about-card-3']}>
                            <div className='relative'>
                                <Image className='absolute -top-14 right-4' src={soup} alt='hamburger' />
                            </div>
                            <div className={styles['about-card-text']}>
                                <h3>Tomato Soup</h3>
                                <Image src={stars} alt='stars' />
                                <span>$7.90</span>
                            </div>
                        </div>
                        <div className={styles['about-card-4']}>
                            <div className='relative'>
                                <Image className='absolute -top-14 right-4' src={coffee} alt='hamburger' />
                            </div>
                            <div className={styles['about-card-text']}>
                                <h3>Papa Coffee</h3>
                                <Image src={stars} alt='stars' />
                                <span>$1.40</span>
                            </div>
                        </div>
                    </div>
                </section>
            </ClientContainer>
        </>
    )
}

export default index

export const getServerSideProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common']))
    }
});