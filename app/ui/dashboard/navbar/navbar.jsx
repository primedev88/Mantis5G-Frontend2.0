"use client"

import React, { useEffect, useState } from 'react'
import styles from "./navbar.module.css"
import { IoIosCheckmarkCircle } from "react-icons/io";
import { toast } from 'react-hot-toast';


const Navbar = ({ ranStatus, ueStatus, coreStatus, speed }) => {

  const [update, setUpdate] = useState(false)
  const [checks,setChecks] = useState(1)

  useEffect(()=>{
    const updatedChecks =1+
    (coreStatus.status[0]?.includes('running') ? 1 : 0) +
    (ranStatus[1]?.count > 0 ? 1 : 0) +
    (speed?.Download?.includes("Check Internet Connection") ? 0 : 1) +
    (ueStatus?.count > 0 ? 1 : 0);
    setChecks(updatedChecks);
  },[ ranStatus, ueStatus, coreStatus, speed])

  const handleClick = () => {
    if (!update) {
      toast.error("No updates available !")
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        Welcome Admin !
      </div>
      <div className={styles.operation}>
        <div className={styles.checks}>
          <div className={styles.check}><IoIosCheckmarkCircle /></div>
          <div className={styles.txt}>{checks}/5 Checks Passed</div>
          <div className={styles.icon}>i</div>
        </div>
        <div className={styles.ico} onClick={handleClick}>
          <div className={styles.update}></div>
          {update && <div className={styles.status}></div>}

        </div>
      </div>
    </div>
  )
}

export default Navbar