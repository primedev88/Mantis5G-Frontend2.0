"use client"

import styles from './configure.module.css'
import { useConfig } from '../../../context/ConfigContext';
import { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa";

import CoreConfig from './coreConfig/coreConfig';
import RanConfig from './ranConfig/ranConfig';

const Configure = ({ ranStatus, coreStatus = { Name: [], status: [], since: [], uptime: [] } }) => {
    const { selectedConfig, setSelectedConfig } = useConfig();

    useEffect(() => {
        if (!selectedConfig) {
            setSelectedConfig('core');
        }
    }, [selectedConfig, setSelectedConfig]);

    return (
        <div className={styles.container}>
            <div className={styles.col1}>
                <div className={`${styles.btn} ${selectedConfig == 'core' ? styles.selectedcore : ''}`} onClick={() => setSelectedConfig('core')}>
                    <div className={styles.txtico}>
                        <div className={styles.coretxt}>1. Configure Core Network</div>
                        <div className={styles.arrow}>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>

                <div className={`${styles.rbtn} ${selectedConfig == 'ran' ? styles.selectedcore : ''}`} onClick={() => setSelectedConfig('ran')}>
                    <div className={styles.txtico}>
                        <div className={styles.rantxt}>2. Configure 5G Radio Access Network</div>
                        <div className={styles.arrow}>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.col2}></div>
            <div className={`${styles.col3} ${selectedConfig == 'core' ? styles.corecol3 : ''}`}>
                {
                    selectedConfig == 'core' ? (
                        <CoreConfig coreStatus={coreStatus} ranStatus={ranStatus}/>
                    ) : (
                        <RanConfig ranStatus={ranStatus}/>
                    )
                }
            </div>
        </div>
    );
};

export default Configure;
