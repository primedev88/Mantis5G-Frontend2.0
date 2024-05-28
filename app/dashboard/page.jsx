"use client"

import React, { useContext, useEffect, useState } from 'react';
import Core from '../ui/dashboard/core/core';
import styles from '../ui/dashboard/dashboard.module.css'
import Packetflow from '../ui/dashboard/packetflow/packetflow';
import Ran from '../ui/dashboard/ran/ran';
import StatusBar from '../ui/dashboard/statusbar/statusBar';
import Ue from '../ui/dashboard/ue/ue';
import { RxCross2 } from "react-icons/rx";
import { DataContext } from '../context/DataContext';

const Dashboard = () => {
  const { coreStatus, ranStatus, ueStatus, packetCapture, ip, speed } = useContext(DataContext);
  const [visible, setVisible] = useState(true);
  const [devices, setDevices] = useState([
    { name: 'Device Running', connected: true },
    { name: '5G Core Network Running', connected: false },
    { name: '5G RAN Stopped', connected: false },
    { name: 'Connected to Internet', connected: false },
    { name: '5G Devices Connected', connected: false },
  ]);
  useEffect(() => {
    const updatedDevices = [
      { name: 'Device Running', connected: true }, // Assume device is always running
      { name: '5G Core Network ', connected: coreStatus.status[0]?.includes('running') ?? false },
      { name: '5G RAN ', connected: ranStatus[1]?.count > 0 ? true : false },
      { name: 'Internet Connectivity', connected: speed?.Download?.includes("Check Internet Connection") ? false : true },
      { name: '5G Devices Connected', connected: ueStatus?.count > 0 ? true : false }, // Assuming speed > 0 indicates devices are connected
    ];
    if(coreStatus.status[0]?.includes('running') && ranStatus[1]?.count > 0 && !speed?.Download?.includes("Check Internet Connection") && ueStatus?.count > 0){
      
    }
    else{
      setVisible(true);
    }
    setDevices(updatedDevices);
  }, [coreStatus, ranStatus, ueStatus, speed])

  const handleCancel =()=>{
    setVisible(false);
  }

  return (
    <div className={styles.dashboard}>
      {visible &&
        <div className={styles.progress}>
          <div className={styles.bar}>
            <StatusBar devices={devices} />
            <div className={styles.cancel} onClick={handleCancel}>
              <RxCross2 />
            </div>
          </div>
        </div>
      }

      <div className={styles.info}>
        <div className={styles.core}>
          <Core coreStatus={coreStatus} />
        </div>
        <div className={styles.ran}>
          <Ran ranStatus={ranStatus} />
        </div>
        <div className={styles.ue}>
          <Ue ueStatus={ueStatus} />
        </div>
        <div className={styles.packet}>
          <Packetflow packetCapture={packetCapture} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
