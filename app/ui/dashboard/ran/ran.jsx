import React from 'react'
import styles from './ran.module.css'
import { PiPowerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

const Ran = () => {
  const rans=[
    {
      id:"0x1000",
      status:"Stopped"
    },
    {
      id:"0x1000",
      status:"Running" 
    }
  ]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.heading}>5G Radio Access Network</div>
          <div className={styles.count}>1</div>
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
        {
          rans.map((ran,index)=>(
            <>
              <div className={styles.row}>
                <div className={styles.leftr}>
                  <div className={styles.num}>
                    {index+1}
                  </div>
                  <div className={styles.hori}></div>
                  <div className={styles.rtext}>
                    gNodeB ID :{ran.id}
                  </div>
                </div>
                <div className={styles.rightr}>
                  <div className={styles.hori}></div>
                  <div className={styles.ltext} style={ran.status=='Running'? {color:'rgb(12, 197, 12)'}:{color:'red'}}>
                    {ran.status}
                  </div>
                </div>
              </div>
              <div className={styles.divider}></div>
            </>
          ))
        }
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