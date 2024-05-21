"use client"

import React from 'react'
import styles from './packetflow.module.css'
import { HiDownload } from "react-icons/hi";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

const Packetflow = () => {

  const packets=[
    {
      timestamp:"1616202971",
      protocol:"GNB",
      message:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, tempore illum! Ab nesciunt, voluptatem iste distinctio fuga possimus assumenda fugit."
    },
    {
      timestamp:"1616202971",
      protocol:"GNB",
      message:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, tempore illum! Ab nesciunt, voluptatem iste distinctio fuga possimus assumenda fugit."
    },
    {
      timestamp:"1616202971",
      protocol:"GNB",
      message:"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, tempore illum! Ab nesciunt, voluptatem iste distinctio fuga possimus assumenda fugit."
    }
  ]

  const handleDownload = () => {
    // Convert timestamps to human-readable dates and times
    const packetsWithFormattedDates = packets.map(packet => {
      const timestampInSeconds = parseInt(packet.timestamp, 10);
      const date = new Date(timestampInSeconds * 1000);
      return {
        ...packet,
        date: format(date, 'dd-MM-yyyy'),
        time: format(date, 'HH:mm:ss')
      };
    });
    const worksheet = XLSX.utils.json_to_sheet(packetsWithFormattedDates);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Log');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'log.xlsx');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>Packet Flow</div>
        <div className={styles.download} onClick={handleDownload}>
          Download Log
          <HiDownload />
        </div>
      </div>
      <div className={styles.body}>
      {packets.map((packet, index) => {
          const timestampInSeconds = parseInt(packet.timestamp, 10);
          const date = new Date(timestampInSeconds * 1000);
          const formattedDate = format(date, 'dd-MM-yyyy');
          const formattedTime = format(date, 'HH:mm:ss');

          return (
            <div key={index}>
              <div className={styles.packet}>
                <div className={styles.phead}>
                  <div className={styles.pdate}>
                    {formattedDate} {formattedTime}
                  </div>
                  <div className={styles.ptext}>
                    Protocol: {packet.protocol}
                  </div>
                </div>
                <div className={styles.pbody}>{packet.message}</div>
              </div>
              <div className={styles.divider}></div>
            </div>
          );
        })}
      </div>
      

    </div>
  )
}

export default Packetflow