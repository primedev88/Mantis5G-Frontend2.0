"use client"

import React, { useContext } from 'react'
import styles from '../ui/dashboard/dashboard.module.css'
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import withAuth from '../lib/actions';
import { DataContext, DataProvider } from '../context/DataContext';

const Layout = ({children}) => {
  const { coreStatus, ranStatus , ueStatus , packetCapture , ip , speed } = useContext(DataContext);
  return (
  <div className={styles.container}>
    <div className={styles.menu}>
      <Sidebar ranStatus={ranStatus} ueStatus={ueStatus} coreStatus={coreStatus} ip={ip} speed={speed}/>
    </div>
    <div className={styles.content}>
      <Navbar/>
      {children}
    </div>
  </div>)
}

const WrappedLayout =  withAuth(Layout);

const LayoutWrapper = ({children}) => (
  <DataProvider>
    <WrappedLayout>{children}</WrappedLayout>
  </DataProvider>
);


export default LayoutWrapper;