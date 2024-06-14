"use client"

import React, { useContext, useState } from 'react'
import styles from '../ui/dashboard/dashboard.module.css'
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import withAuth from '../lib/actions';
import { DataContext, DataProvider } from '../context/DataContext';
import { ConfigProvider } from '../context/ConfigContext';
import DialogueBox from '../ui/dashboard/dialogueBox/dialogueBox';
import { _getRestart } from '../api/api';


const Layout = ({ children }) => {
  const { coreStatus, ranStatus, ueStatus, packetCapture, ip, speed } = useContext(DataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRestartClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    _getRestart()
      .then()
      .catch()
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar ranStatus={ranStatus} ueStatus={ueStatus} coreStatus={coreStatus} ip={ip} speed={speed} onRestartClick={handleRestartClick} />
      </div>
      <div className={styles.content}>
        <Navbar ranStatus={ranStatus} ueStatus={ueStatus} coreStatus={coreStatus} speed={speed} />
        {children}
      </div>
      {isModalOpen && (
        <DialogueBox
          message="Are you sure you want to restart?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>)
}

const WrappedLayout = withAuth(Layout);

const LayoutWrapper = ({ children }) => (
  <DataProvider>
    <ConfigProvider>
      <WrappedLayout>{children}</WrappedLayout>
    </ConfigProvider>
  </DataProvider>
);


export default LayoutWrapper;