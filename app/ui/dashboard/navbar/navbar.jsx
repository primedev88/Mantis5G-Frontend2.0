"use client"

import React from 'react'
import styles from "./navbar.module.css" 
import { IoIosCheckmarkCircle } from "react-icons/io";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Welcome Admin !
      </div>
      <div className={styles.operation}>
        <div className={styles.checks}>
          <div className={styles.check}><IoIosCheckmarkCircle /></div>
          <div className={styles.txt}>3/5 Checks Passed</div>
          <div className={styles.icon}>i</div>
        </div>
        <div className={styles.ico}>
          <div className={styles.update}></div>
          <div className={styles.status}></div>
        </div>
      </div>
    </div>
  )
}

export default Navbar