'use client'
import React, { useEffect } from 'react'
import styles from '../Dashboard/Dashboard.module.css';
import Doughnutdetail from './Dashboardsdetail';
import { useTranslation } from 'next-i18next'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Doughnut() {
  const { t } = useTranslation('common')

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className={styles.orders} data-aos="fade-left">
      <h1 className={styles.dash_h1}>{t('Orders')}</h1>
      <h2 className={styles.imh_h2}>{t('Projects by')} <br /> {t('account')}</h2>
      <img className={styles.doughnut_div} src='/doughnut.svg' alt='doughnut' />
      <Doughnutdetail />
    </div>
  )
}

export default Doughnut
