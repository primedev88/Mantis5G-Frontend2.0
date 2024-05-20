import React from 'react'
import styles from './ue.module.css'

const Ue = () => {
  const devices = [
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
    {
      rnti: '0x4837',
      downlink: '80',
      uplink: '20'
    },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>5G UEs Connected</div>
        <div className={styles.count}>3</div>
      </div>
      <div className={styles.body}>
        {devices.map((device, index) => (
          <>
            <div className={styles.row}>
              <div className={styles.left}>
                <div>{index + 1}</div>
                <div className={styles.text}>RNTI ID:{device.rnti}</div>
              </div>
              <div className={styles.right}>
                <div className={styles.link}>
                  <div className={styles.icondown}></div>
                  <div className={styles.speed}>{device.downlink} Mbps</div>
                </div>
                <div className={styles.link}>
                  <div className={styles.iconup}></div>
                  <div className={styles.speed}>{device.uplink} Mbps</div>
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Ue