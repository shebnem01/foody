'use client'
import React, { useEffect } from 'react'
import styles from '../Dashboard/Dashboard.module.css';
import { useTranslation } from 'next-i18next'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Emptycell() {
  const { t } = useTranslation('common')

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className={`${styles.common_div} mr-4`} data-aos='fade-left'>
      <h1 className={styles.dash_h1}>{t('Assigned Risks')}</h1>
      <p className={styles.dash_p}>{t('There are no risks assigned.')}</p>
    </div>
  )
}

export default Emptycell
