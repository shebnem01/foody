'use client'
import React, { useEffect } from 'react'
import styles from '../Dashboard/Dashboard.module.css';
import Staticaldetail from './Staticaldetail';
import { useTranslation } from 'next-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Statisticaltable() {
  const { t } = useTranslation('common')

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
      <div className={styles.salary} data-aos='fade-right'>
        <h1 className={styles.years_h1}>{t('Total Salary')}</h1>
        <p className={styles.years_p}>{t('Years')}</p>
        <img className={styles.img_dash} src='/diagram.svg' alt='staticaltable' />
        <Staticaldetail />
      </div>
    </>
  )
}

export default Statisticaltable;
