import React from 'react'
import styles from './statusBar.module.css'
import { MdCheckCircle,MdCancel } from "react-icons/md";

const StatusBar = ({devices}) => {

  return (
    <div className={styles.statusbar}>
      {devices.map((device, index) => (
        <div key={device.name} className={styles.devicestatus}>
          {device.connected ? (
            <MdCheckCircle className={`${styles.icon} ${styles.check}` }/>
          ) : (
            <MdCancel className={`${styles.icon} ${styles.cross}`} />
          )}
          <div className={styles.devicename}>{device.name}</div>
          
          {index < devices.length - 1 && <span className={styles.dottedline}></span>}
        </div>
      ))}
    </div>
  )
}

export default StatusBar