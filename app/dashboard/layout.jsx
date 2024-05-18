"use client"

import React from 'react'
import styles from '../ui/dashboard/dashboard.module.css'
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';
import withAuth from '../lib/actions';

const Layout = ({children}) => {
  
  return (
  <div className={styles.container}>
    <div className={styles.menu}>
      <Sidebar/>
    </div>
    <div className={styles.content}>
      <Navbar/>
      {children}
    </div>
  </div>)
}

export default withAuth(Layout);