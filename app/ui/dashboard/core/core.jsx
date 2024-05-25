import React from 'react'
import styles from './core.module.css'
import { PiPowerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";


const getStatusColor = (status) => status === 'running' ? 'rgb(27, 199, 27)' : 'red';

const CoreComponent = ({ name, status }) => (
  <div className={styles.col}>
    <div className={styles.circle} style={{ backgroundColor: getStatusColor(status) }}></div>
    {name}
  </div>
);

const Core = ({coreStatus}) => {
  console.log(coreStatus)
  const coreStatusArray = [
    {
      name: 'UPF',
      status: 'running'
    },
    {
      name: 'UDM',
      status: 'running'
    },
    {
      name: 'AUSF',
      status: 'running'
    },
    {
      name: 'SMF',
      status: 'running'
    },
    {
      name: 'AMF',
      status: 'running'
    },
    {
      name: 'User DB',
      status: 'running'
    },

  ]

  if (coreStatus && coreStatus.Name && coreStatus.status) {
    for (let i = 0; i < coreStatusArray.length; i++) {
      const core = coreStatusArray[i];
      let found = false;
      for (let j = 0; j < coreStatus.Name.length; j++) {
        if (coreStatus.Name[j].toLowerCase() === (core.name + 'd').toLowerCase()) {
          core.status = coreStatus.status[j].includes('running') ? 'running' : 'inactive';
          found = true;
          break;
        }
      }
      if (!found) {
        core.status = 'inactive';
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.heading}>5G Core Network</div>
        </div>
        <div className={styles.right}>
          <div className={styles.box}>
            <div className={styles.icon}>
              <PiPowerFill />
            </div>
            <div className={styles.text}>
              Stop
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.row}>
          {coreStatusArray.slice(0, 3).map((core, index) => (
            <CoreComponent key={index} name={core.name} status={core.status} />
          ))}
        </div>
        <div className={styles.img}></div>
        <div className={styles.row}>
          {coreStatusArray.slice(3).map((core, index) => (
            <CoreComponent key={index + 3} name={core.name} status={core.status} />
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.rinfo}>
          <div className={styles.active}>
            <div className={styles.shape1}></div>
            <div className={styles.ftext}>Active</div>
          </div>
          <div className={styles.inactive}>
            <div className={styles.shape2}></div>
            <div className={styles.ftext}>Inactive</div>
          </div>
        </div>
        <div className={styles.configure}>
          <div className={styles.conicon}><IoMdSettings /></div>
          <div className={styles.context}>Configure</div>
        </div>
      </div>
    </div>
  )
}

export default Core