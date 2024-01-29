import styles from '../Dashboard/Dashboard.module.css';
import { useTranslation } from 'next-i18next'

function Staticaldetail() {
  const { t } = useTranslation('common')

  return (
    <div >
      <ul className='flex gap-gp ml-mld mt-mtd'>
        <li className={styles.li_dash}><button className={styles.btn_dash_feb}></button>{t('February')}</li>
        <li className={styles.li_dash}><button className={styles.btn_dash_march}></button>{t('March')}</li>
        <li className={styles.li_dash}><button className={styles.btn_dash}></button>{t('April')}</li>
      </ul>
    </div>
  )
}

export default Staticaldetail
