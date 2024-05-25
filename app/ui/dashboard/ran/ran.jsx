import React from 'react'
import styles from './ran.module.css'
import { PiPowerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

const Ran = ({ ranStatus }) => {
  const ranCount = ranStatus?.[1]?.count ?? 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.heading}>5G Radio Access Network</div>
          <div className={styles.count}>{ranCount}</div>
        </div>
        <div className={styles.right}>
          <div className={styles.box}>
            <div className={styles.icon}>
              <PiPowerFill />
            </div>
            <div className={styles.text}>
              Start
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        {ranCount > 0 ? (
          <>
            <div className={styles.row}>
              <div className={styles.leftr}>
                <div className={styles.num}>
                  1
                </div>
                <div className={styles.hori}></div>
                <div className={styles.rtext}>
                  gNodeB ID :{ranStatus?.[0]?.ID}
                </div>
              </div>
              <div className={styles.rightr}>
                <div className={styles.hori}></div>
                <div className={styles.ltext} style={ranCount > 0 ? { color: 'rgb(12, 197, 12)' } : { color: 'red' }}>
                  Running
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
          </>
        ) : "No ran running"}
      </div>
      <div className={styles.footer}>
        <div></div>
        <div className={styles.configure}>
          <div className={styles.conicon}><IoMdSettings /></div>
          <div className={styles.context}>Configure</div>
        </div>
      </div>
    </div>
  )
}

export default Ran