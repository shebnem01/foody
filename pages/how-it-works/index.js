import Image from 'next/image'
import React, { useEffect } from 'react'
import ClientContainer from '../../components/common/ClientContainer/ClientContainer'
import styles from './works.module.css'
import worksBg from '../../assets/images/worksBg.svg'
import worksImg from '../../assets/images/worksImg.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const index = () => {
    const { t } = useTranslation('common')

    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <>
            <title>Foody | How-It-Works</title>
            <ClientContainer>
                <section className='lg:mt-16 lg:mx-48 m-10' data-aos='zoom-in'>
                    <div className={styles['works-head']}>
                        <h2>{t('How it works')}</h2>
                        <p>
                            {t('Delivery may be extended during sale periods. Please refer to the checkout page for an updated estimate for your location. Kindly note that once you have placed an order, it is no longer possible to modify your order. Taxes and duties are included in all product prices.It is possible to place an order with shipment to a different address than your home or billing address when paying with a credit card. Please note that Klarna payments require that your order is shipped to your registered home address.')}
                        </p>
                    </div>
                    <div className={styles['works-image-container']}>
                        <Image className={styles.bg} src={worksBg} alt='background' />
                        <Image className={styles.img} src={worksImg} alt='works-image' />
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