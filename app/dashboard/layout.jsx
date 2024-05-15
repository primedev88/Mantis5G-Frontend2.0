"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/app/lib/actions';
import React from 'react'
import styles from '../ui/dashboard/dashboard.module.css'
import Sidebar from '../ui/dashboard/sidebar/sidebar';
import Navbar from '../ui/dashboard/navbar/navbar';


const Layout = ({children}) => {
  const router = useRouter();
  let flag=false;
  useEffect(() => {
    const checkAuthentication = async () => {
      const authenticated = await isAuthenticated();
      
      if (!authenticated) {
        router.push('/login');
      }
    };

    checkAuthentication();
  }, []);
  return (
  <div className={styles.container}>
    <div className={styles.menu}><Navbar/></div>
    <div className={styles.content}>
      <Sidebar/>
      {children}
    </div>
  </div>)
}

export default Layout