"use client"

import React, { useEffect, useRef, useState } from 'react'
import styles from './ue.module.css'
import { _getUeStatus } from '@/app/api/api';

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

const Ue = () => {
  const [ueStatus, setUeStatus] = useState({
    count: [],
    rnti: [],
    ul_rate: [],
    dl_rate: [],
  });
  const [ueCount, setUeCount] = useState(0);

  useInterval(() => {
    _getUeStatus()
      .then(data => {
        
        setUeStatus(data); // This will log the resolved data
        setUeCount(data.count)
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }, 1000)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.heading}>5G UEs Connected</div>
        <div className={styles.count}>{ueCount}</div>
      </div>
      <div className={styles.body}>
        {ueStatus.rnti.map((rnti, index) => (
          <>
            <div className={styles.row}>
              <div className={styles.left}>
                <div>{index + 1}</div>
                <div className={styles.text}>RNTI ID: {rnti}</div>
              </div>
              <div className={styles.right}>
                <div className={styles.link}>
                  <div className={styles.icondown}></div>
                  <div className={styles.speed}>
                    <div className={styles.speedtxt}>
                      {Math.round((ueStatus.dl_rate[index] / 1000000) * 100) / 100}
                    </div>
                    <div className={styles.speedunit}>
                      Mbps
                    </div>
                  </div>
                </div>
                <div className={styles.link}>
                  <div className={styles.iconup}></div>
                  <div className={styles.speed}>
                    <div className={styles.speedtxt}>
                      {Math.round((ueStatus.ul_rate[index] / 1000000) * 100) / 100}
                    </div>
                    <div className={styles.speedunit}>
                      Mbps
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
          </>
        ))}
      </div>
    </div>
  )
}

export default Ue