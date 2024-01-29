import React from 'react'
import styles from "./rightsidebar.module.css";

function Rightdetail() {
  return (
    <div>
      <div className="w-wxl shadow-shadoww">
        <img className={styles.img_div} src="/coffemania.svg" alt="coffeemania" />
        <div className="ml-mll">
          <h1 className={styles.coffdiv}>Coffee Mania</h1>
          <span className={styles.spn_div}>
            chinese, sea-food, thai, lebanese, caribbean
          </span>
          <div className="flex justify-between items-center pr-2">
            <p className={styles.pdiv}>$5 Delivery</p>
            <button className={styles.btndiv}>
              <p className={styles.btnp}>09 Min</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rightdetail
