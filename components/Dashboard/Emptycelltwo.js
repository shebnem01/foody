'use client'
import React, { useEffect } from 'react'
import styles from '../Dashboard/Dashboard.module.css';
import { useTranslation } from 'next-i18next'
import AOS from 'aos';
import 'aos/dist/aos.css';

function Emptycelltwo() {
  const { t } = useTranslation('common')

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <div className={`${styles.common_div}`} data-aos='fade-right'>
      <h1 className={styles.dash_h1}>{t('Assigned Action Items')}</h1>
      <p className={styles.dash_p}>{t('There are no action items assigned.')}</p>
    </div>
  )
}

export default Emptycelltwo
