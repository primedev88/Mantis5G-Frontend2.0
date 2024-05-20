import React from 'react'
import styles from './statusBar.module.css'
import { MdCheckCircle,MdCancel } from "react-icons/md";

const StatusBar = () => {
  const devices = [
    { name: 'Device Running', connected: true },
    { name: '5G Core Network Running', connected: true },
    { name: '5G RAN Stopped', connected: false },
    { name: 'Connected to Internet', connected: true },
    { name: '5G Devices Connected', connected: false },
  ];
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