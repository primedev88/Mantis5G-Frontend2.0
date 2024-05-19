"use client"

import React from 'react'
import styles from "./navbar.module.css" 

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Welcome Admin !
      </div>
      <div className={styles.operation}>
        <div className={styles.checks}>
          <div className={styles.checkcontain}>
            
          </div>
        </div>
        <div className={styles.update}></div>
      </div>
    </div>
  )
}

export default Navbar