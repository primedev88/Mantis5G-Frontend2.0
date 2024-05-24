"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from './monitor.module.css'
import { FaChevronRight } from "react-icons/fa";
import { HiDownload, HiUpload } from "react-icons/hi";
import { _getNetworkkpi } from '@/app/api/api';
import LineChart from './LineChart/lineChart';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const Monitor = () => {
    const [ueData, setUeData] = useState({});
    const [selectedRntiId, setSelectedRntiId] = useState('');
    const [isInitialSelection, setIsInitialSelection] = useState(true);
    const [Mcs, setMcs] = useState({
        labels: Array(8).fill(''), // to store timestamps
        datasets: [
            {
                label: "dl-mcs Values",
                data: Array(8).fill(0), // to store RSSI values
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "black",
                borderWidth: 2,
            },
            {
                label: "dl-mcs Values",
                data: Array(8).fill(0), // to store RSSI values
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "black",
                borderWidth: 2,
            }
        ],
    });

    const [Brate, setBrate] = useState({
         // to store timestamps
        labels: Array(8).fill('0'),
        datasets: [
            {
                label: "dl-brate rate",
                data: Array(8).fill(0),// to store bitrate values
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "black",
                borderWidth: 4,
            },
            {
                label: "dl-brate rate",
                data: Array(8).fill(0),// to store bitrate values
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "black",
                borderWidth: 4,
            }
        ],
    });

    const [cqidata, setCqidata] = useState({
        labels: Array(8).fill(''), // to store timestamps
        datasets: [
            {
                label: "CQI",
                data: Array(8).fill(0), // to store bitrate values
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    const [snrdata, setSnrdata] = useState({
        labels: Array(8).fill(''), // to store timestamps
        datasets: [
            {
                label: "SNR rate",
                data: Array(8).fill(0), // to store bitrate values
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "black",
                borderWidth: 2,
            },
        ],
    });

    useInterval(() => {
        _getNetworkkpi()
            .then(data => {
                setUeData(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, 1000)

    useEffect(() => {
        if (isInitialSelection && Object.keys(ueData).length > 0) {
            const firstKey = Object.keys(ueData)[0];
            setSelectedRntiId(firstKey);
        }
        let jsonObject = ueData;
        if (ueData[selectedRntiId] !== undefined) {
            const timestamp = jsonObject[selectedRntiId]["timestamp"].map((timestamp) => {
                let timeString = new Date(timestamp * 1000).toLocaleTimeString();
                return timeString;
            });
            const cqivalue = jsonObject[selectedRntiId]["cqi"];
            const ulbratevalue = jsonObject[selectedRntiId]["ul_brate"].map((ulbrate)=>{
                let uround = Math.round((ulbrate / 1000000) * 100) / 100
                return uround;
            });

            const dlbratevalue = jsonObject[selectedRntiId]["dl_brate"].map((dlbrate)=>{
                let dround = Math.round((dlbrate / 1000000) * 100) / 100
                return dround;
            });
            const dlmcsvalue = jsonObject[selectedRntiId]["dl_mcs"];
            const ulmcsvalue = jsonObject[selectedRntiId]["ul_mcs"];
            const snrvalue = jsonObject[selectedRntiId]["pusch"];

            setMcs(() => ({
                labels: [...timestamp], // Append new timestamps
                datasets: [
                    {
                        label: "ul-mcs Values",
                        data: [...ulmcsvalue], // Append new RSSI values
                        backgroundColor: 'rgb(243, 111, 65)',
                        borderColor: 'rgb(243, 111, 65)',
                        borderWidth: 2,
                        tension: 0.1, // Adjust line tension for a smoother curve
                        // pointStyle: 'rectRounded',
                        fill: true,
                        // fill: 'start', 
                        pointRadius: 0
                    },
                    {
                        label: "dl-mcs Values",
                        data: [...dlmcsvalue],
                        backgroundColor: 'rgb(110, 187, 59)',
                        borderColor: 'rgb(110, 187, 59)',
                        borderWidth: 2,
                        tension: 0.1, // Adjust line tension for a smoother curve
                        // pointStyle: 'rectRounded',
                        fill: true,
                        pointRadius: 0
                    }
                    
                ],
            }));


            setBrate(() => ({
                labels: [...timestamp], // Append new timestamps
                datasets: [
                    {
                        label: "ul-brate rate",
                        data: [...ulbratevalue], // Append new RSSI values
                        backgroundColor: 'rgb(243, 111, 65)',
                        borderColor: 'rgb(243, 111, 65)',
                        borderWidth: 2,
                        tension: 0.1, // Adjust line tension for a smoother curve
                        // pointStyle: 'rectRounded',
                        fill: true,
                        // fill: 'start', 
                        pointRadius: 0
                    },
                    {
                        label: "dl-brate rate",
                        data: [...dlbratevalue], // Append new RSSI values
                        backgroundColor: 'rgb(110, 187, 59)',
                        borderColor: 'rgb(110, 187, 59)',
                        borderWidth: 2,
                        tension: 0.1, // Adjust line tension for a smoother curve
                        // pointStyle: 'rectRounded',
                        fill: true,
                        // fill: 'start', 
                        pointRadius: 0
                    }
                    
                ],
            }));

            setCqidata(() => ({
                labels: [...timestamp], // Append new timestamps
                datasets: [
                    {
                        label: "CQI",
                        data: [...cqivalue], // Append new RSSI values
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderColor: 'white',
                        borderWidth: 2,
                        tension: 0.1, // Adjust line tension for a smoother curve
                        // pointStyle: 'rectRounded',
                        fill: true,
                        // fill: 'start', 
                        pointRadius: 0
                    },
                ],
            }));

            setSnrdata(() => ({
                labels: [...timestamp], // Append new timestamps
                datasets: [
                    {
                        label: "SNR Values",
                        data: [...snrvalue], // Append new RSSI values
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderColor: 'white',
                        borderWidth: 2,
                        tension: 0.1, // Adjust line tension for a smoother curve
                        // pointStyle: 'rectRounded',
                        fill: true,
                        // fill: 'start', 
                        pointRadius: 0
                    },
                ],
            }));

        }
    }, [ueData, isInitialSelection]);



    const handleUeClick = (rntiId) => {
        setSelectedRntiId(rntiId);
        setIsInitialSelection(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.col1}>
                <div className={styles.col1txt}>
                    {
                        Object.keys(ueData).length > 0 ? '5G UEs Connected' : 'No UEs Connected'
                    }
                </div>
                <div className={styles.list}>
                    {Object.keys(ueData).map((rntiId, index) => {
                        const rntiIdHex = parseInt(rntiId, 10).toString(16).toUpperCase();
                        const isSelected = selectedRntiId === rntiId;
                        return (
                            <div
                                key={rntiId}
                                onClick={() => handleUeClick(rntiId)}
                                className={`${styles.ue} ${isSelected ? styles.selected : ''}`}>
                                <div className={styles.uesecond}>
                                    <div className={styles.uetxt}>
                                        <div>{index + 1}</div>
                                        <div>RNTI ID: 0x{rntiIdHex}</div>
                                    </div>
                                    <div className={styles.arrow}><FaChevronRight /></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {
                Object.keys(ueData).length > 0 ? (
                    <>
                        <div className={styles.col3}></div>
                        <div className={styles.col2}>
                            <div className={styles.header}>
                                <div className={styles.left}>
                                    <div className={styles.icon}></div>
                                    <div className={styles.ltxt}>{parseInt(selectedRntiId, 10).toString(16).toUpperCase()}'s Analytics</div>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.active}>
                                        <div className={styles.shape1}></div>
                                        <div className={styles.ftext}>Uplink</div>
                                    </div>
                                    <div className={styles.inactive}>
                                        <div className={styles.shape2}></div>
                                        <div className={styles.ftext}>Downlink</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <div className={styles.g}>
                                    <div className={styles.mcs}>
                                        <div className={styles.mhead}>
                                            <div className={styles.mtxt}>MCS Throughput</div>
                                            <div className={styles.mright}>
                                                <div className={styles.umcs}>
                                                    <HiUpload />
                                                    {Mcs.datasets[1].data[Mcs.datasets[1].data.length - 1]}
                                                </div>
                                                <div className={styles.dmcs}>
                                                    <HiDownload />
                                                    {Mcs.datasets[0].data[Mcs.datasets[0].data.length - 1]}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.mbody}>
                                            <LineChart chartData={Mcs} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.g}>
                                    <div className={styles.speed}>
                                        <div className={styles.mhead}>
                                            <div className={styles.mtxt}>Transfer Speed</div>
                                            <div className={styles.spright}>
                                                <div className={styles.upload}>
                                                    <div><HiUpload /></div>
                                                    <div>{Brate.datasets[1].data[Brate.datasets[1].data.length - 1]}</div>
                                                    <div>Mbps</div>
                                                </div>
                                                <div className={styles.download}>
                                                    <div><HiDownload /></div>
                                                    <div>{Brate.datasets[0].data[Brate.datasets[0].data.length - 1]}</div>
                                                    <div>Mbps</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.mbody}>
                                            <LineChart chartData={Brate} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.g}>
                                    <div className={styles.snr}>
                                        <div className={styles.mhead}>
                                            <div className={styles.mtxt}>SNR</div>
                                            <div className={styles.sright}>
                                                <div className={styles.stxt}>
                                                {Math.round(snrdata.datasets[0].data[snrdata.datasets[0].data.length - 1]*100)/100}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.mbody}>
                                            <LineChart chartData={snrdata} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.g}>
                                    <div className={styles.cqi}>
                                        <div className={styles.mhead}>
                                            <div className={styles.mtxt}>CQI</div>
                                            <div className={styles.sright}>
                                                <div className={styles.stxt}>
                                                    {Math.round(cqidata.datasets[0].data[cqidata.datasets[0].data.length - 1]*100)/100}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.mbody}>
                                            <LineChart chartData={cqidata} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : ''
            }

        </div>
    )
}

export default Monitor;