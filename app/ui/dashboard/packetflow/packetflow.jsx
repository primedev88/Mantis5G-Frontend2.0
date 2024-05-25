"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from './packetflow.module.css'
import { HiDownload } from "react-icons/hi";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { _getPacketCapture } from '@/app/api/api';

const Packetflow = ({packetCapture}) => {

  const handleDownload = () => {
    // Convert timestamps to human-readable dates and times
    const packetsWithFormattedDates = packetCapture.map(packet => {
      // const timestampInSeconds = parseInt(packet.timestamp, 10);
      // const date = new Date(timestampInSeconds * 1000);
      return {
        ...packet,
        // date: format(date, 'dd-MM-yyyy'),
        // time: format(date, 'HH:mm:ss')
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
        {packetCapture.length === 0 ? "No Entries found" : (<div>
          {
            packetCapture.map((packet, index) => {
              // const timestampInSeconds = parseInt(packet.timestamp, 10);
              // const date = new Date(timestampInSeconds * 1000);
              // const formattedDate = format(date, 'dd-MM-yyyy');
              // const formattedTime = format(date, 'HH:mm:ss');

              return (
                <div key={index}>
                  <div className={styles.packet}>
                    <div className={styles.phead}>
                      <div className={styles.pdate}>
                        {packet.TimeStamp}
                      </div>
                      <div className={styles.ptext}>
                        Protocol: {packet.Protocol}
                      </div>
                    </div>
                    <div className={styles.pbody}>{packet.Message}</div>
                  </div>
                  <div className={styles.divider}></div>
                </div>
              );
            })
          }
        </div>)
        }

      </div>


    </div>
  )
}

export default Packetflow