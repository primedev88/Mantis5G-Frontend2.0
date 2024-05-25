"use client"

import React, { useContext } from 'react';
import Core from '../ui/dashboard/core/core';
import styles from '../ui/dashboard/dashboard.module.css'
import Packetflow from '../ui/dashboard/packetflow/packetflow';
import Ran from '../ui/dashboard/ran/ran';
import StatusBar from '../ui/dashboard/statusbar/statusBar';
import Ue from '../ui/dashboard/ue/ue';
import { RxCross2 } from "react-icons/rx";
import { DataContext } from '../context/DataContext';

const Dashboard = () => {
  const { coreStatus, ranStatus , ueStatus , packetCapture , ip , speed } = useContext(DataContext);
  return (
    <div className={styles.dashboard}>
      <div className={styles.progress}>
        <div className={styles.bar}>
          <StatusBar/>
          <div className={styles.cancel}>
            <RxCross2 />
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.core}>
          <Core coreStatus={coreStatus}/>
        </div>
        <div className={styles.ran}>
          <Ran ranStatus={ranStatus}/>
        </div>
        <div className={styles.ue}>
          <Ue ueStatus={ueStatus}/>
        </div>
        <div className={styles.packet}>
          <Packetflow packetCapture={packetCapture}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
