import React from 'react'
import styles from './packetflow.module.css'
import { HiDownload } from "react-icons/hi";

const Packetflow = () => {
  const packet=[
    {
      timestamp:"1716202971",
      protocol:"GNB",
      message:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, tempore illum! Ab nesciunt, voluptatem iste distinctio fuga possimus assumenda fugit."
    },
    {
      timestamp:"1716202971",
      protocol:"GNB",
      message:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, tempore illum! Ab nesciunt, voluptatem iste distinctio fuga possimus assumenda fugit."
    },
    {
      timestamp:"1716202971",
      protocol:"GNB",
      message:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, tempore illum! Ab nesciunt, voluptatem iste distinctio fuga possimus assumenda fugit."
    },
  ]
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>Packet Flow</div>
        <div className={styles.download}>
          Download Log
          <HiDownload />
        </div>
      </div>
      

    </div>
  )
}

export default Packetflow