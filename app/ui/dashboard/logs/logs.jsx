"use client"

import React, { useEffect, useState } from 'react'
import styles from './logs.module.css'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { HiDownload } from "react-icons/hi";
import { _postDockerLog } from '@/app/api/api';
import { toast } from 'react-hot-toast';

const Logs = ({ packetCapture2 }) => {

    const handleDownload = () => {
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
    const [packetCapture, setpacketCapture] = useState([])
    const [value, setValue] = useState('AMF');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await _postDockerLog({ container: value });
                setpacketCapture(response);
                console.log(response)
            } catch (error) {
                toast.error("Error while fetching logs");
            }
        };

        fetchData();
    }, [value]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <div className={styles.htxt}>Logs</div>
                    <div className={styles.drop}>
                        <label >
                            <select value={value} onChange={handleChange}>
                                <option value="AMF">AMF</option>
                                <option value="SMF">SMF</option>
                                <option value="UPF">UPF</option>
                                <option value="AUSF">AUSF</option>
                                <option value="NRF">NRF</option>
                                <option value="UDM">UDM</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div className={styles.download} onClick={handleDownload}>
                    Download Log
                    <HiDownload />
                </div>
            </div>
            <div className={styles.bodycontainer}>
                <div className={styles.body}>
                    {
                        packetCapture.length === 0 ? "No Entries found" : (<div>
                            {packetCapture.map((packet, index) => {
                                // const timestampInSeconds = parseInt(packet.timestamp, 10);
                                // const date = new Date(timestampInSeconds * 1000);
                                // const formattedDate = format(date, 'dd-MM-yyyy');
                                // const formattedTime = format(date, 'HH:mm:ss');
                                return (
                                    <div key={index}>
                                        <div className={styles.packet}>
                                            <div className={styles.phead}>
                                                <div className={styles.pdate}>
                                                    {packet.time}
                                                </div>
                                                <div className={styles.ptext}>
                                                    {packet.protocol}
                                                </div>
                                            </div>
                                            <div className={styles.pbody}>{packet.message}</div>
                                        </div>
                                        <div className={styles.divider}></div>
                                    </div>
                                );
                            })}
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Logs