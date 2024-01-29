import React, { useEffect } from 'react'
import Image from 'next/image'
import homeImg1 from '../../../assets/images/homeImg1.svg'
import homeImg2 from '../../../assets/images/homeImg2.svg'
import homeImg3 from '../../../assets/images/homeImg3.svg'
import styles from './homesection2.module.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'next-i18next'

const HomeSection1 = () => {
  const { t } = useTranslation('common')

  useEffect(() => {
    AOS.init()

  }, [])

  return (
    <>
      <section className='lg:mb-72 mx-3' data-aos="zoom-in-down">
        <div>
          <div className='flex items-center flex-col mb-10'>
            <h2 className={styles.features}>{t('Features')}</h2>
            <p className={styles['home-para']}>
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
            </p>
          </div>
          <div className='flex lg:justify-center lg:mx-4 justify-between flex-wrap '>
            <div className={styles['home-card']}>
              <Image src={homeImg1} alt='homeImage' />
              <h3>{t('Discount Boucher')}</h3>
              <p className='px-2'>Lorem ipsum is placeholder commonly used in the graphic</p>
            </div>
            <div className={styles['home-card']}>
              <Image src={homeImg2} alt='homeImage' />
              <h3>{t('Fresh healthy Food')}</h3>
              <p className='px-2'>Lorem ipsum is placeholder commonly used in the graphic</p>
            </div>
            <div className={styles['home-card']}>
              <Image src={homeImg3} alt='homeImage' />
              <h3>{t('Fast Home Delivery')}</h3>
              <p className='px-2'>Lorem ipsum is placeholder commonly used in the graphic</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeSection1