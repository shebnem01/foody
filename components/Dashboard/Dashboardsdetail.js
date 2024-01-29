import styles from '../Dashboard/Dashboard.module.css';

function Doughnutdetail() {
  return (
    <div >
      <ul className='flex gap-gp mt-8 ml-10'>
        <li className={styles.li_dash}><button className={styles.btn_li_kfc}></button>KFC</li>
        <li className={styles.li_dash}><button className={styles.btn_li_klm}></button>KLM</li>
        <li className={styles.li_dash}><button className={styles.btn_li}></button>American Express</li>
      </ul>
    </div>
  )
}

export default Doughnutdetail;

