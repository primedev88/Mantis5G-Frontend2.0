import React, { useEffect, useState } from 'react'
import styles from './core.module.css'
import { PiPowerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { _getDockerUpResponse, _getDockerDownResponse } from '@/app/api/api';
import { useConfig } from '../../../context/ConfigContext';

import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const getStatusColor = (status) => status === 'running' ? 'rgb(27, 199, 27)' : 'red';

const CoreComponent = ({ name, status }) => (
  <div className={styles.col}>
    <div className={styles.circle} style={{ backgroundColor: getStatusColor(status) }}></div>
    {name}
  </div>
);

const Core = ({ coreStatus = { Name: [], status: [], since: [], uptime: [] } }) => {
  const [coreActive, setCoreActive] = useState(coreStatus.status[0]?.includes('running') ?? false);
  const [coreStatusArray, setCoreStatusArray] = useState([
    {
      name: 'UPF',
      status: 'inactive'
    },
    {
      name: 'UDM',
      status: 'inactive'
    },
    {
      name: 'AUSF',
      status: 'inactive'
    },
    {
      name: 'SMF',
      status: 'inactive'
    },
    {
      name: 'AMF',
      status: 'inactive'
    },
    {
      name: 'User DB',
      status: 'inactive'
    },
  ]

  )
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const { setSelectedConfig } = useConfig();

  const handleSelectConfig = (config) => {
    setSelectedConfig(config);
    router.push('/dashboard/configure');
  };

  useEffect(() => {
    if (coreStatus && coreStatus.Name && coreStatus.status) {
      let anyCoreRunning = false;

      const updatedCoreStatusArray = coreStatusArray.map(core => {
        for (let j = 0; j < coreStatus.Name.length; j++) {
          if (coreStatus.Name[j].toLowerCase() === (core.name + 'd').toLowerCase()) {
            const isRunning = coreStatus.status[j].includes('running');
            core.status = isRunning ? 'running' : 'inactive';
            coreStatusArray[5].status = coreStatus.status[j].includes('running') ? 'running' : 'inactive';
            if (isRunning) {
              anyCoreRunning = true;
            }
            break;
          }
        }
        return core;
      });
      setCoreActive(anyCoreRunning)
      setCoreStatusArray(updatedCoreStatusArray);

    }
  }, [coreStatus]);

  const handleButtonClick = async () => {
    if (coreActive) {
      try {
        setLoading(true);
        const response = await _getDockerDownResponse();

      } catch (err) {
        toast.error('Core still running!');
      } finally {
        setLoading(false);
        setCoreActive(false);
        toast.success('Core stopped successfully!');
      }
    }
    else {
      try {
        setLoading(true);
        const response = await _getDockerUpResponse();

      } catch (err) {
        toast.error('Core deployment error!');
      } finally {
        setLoading(false);
        setCoreActive(true);
        toast.success('Core started successfully!');
      }
    }


  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.heading}>5G Core Network</div>
        </div>
        <div className={styles.right}>
          {
            loading ? (
              <div className={styles.load}></div>
            ) : (
              <div className={styles.box} onClick={handleButtonClick}>
                <div className={styles.icon} >
                  <PiPowerFill style={coreActive ? { color: 'rgb(207, 40, 11)' } : { color: 'rgb(27, 199, 27)' }} />
                </div>
                <div className={styles.text}>
                  {coreActive ? "Stop" : "Start"}
                </div>
              </div>
            )
          }
        </div>
      </div >
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
        <div className={styles.configure} onClick={() => handleSelectConfig('core')}>
          <div className={styles.conicon}><IoMdSettings /></div>
          <div className={styles.context}>Configure</div>
        </div>
      </div>
    </div >
  )
}

export default Core