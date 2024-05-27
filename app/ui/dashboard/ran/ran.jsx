import React, { useEffect, useState } from 'react'
import styles from './ran.module.css'
import { PiPowerFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { _getRanDeploy, _getRanDeploy1, _getRanStop } from '@/app/api/api';
import { toast } from 'react-hot-toast';


const Ran = ({ ranStatus }) => {
  const [ranCount, setRanCount] = useState(0);
  const [ranActive, setRanActive] = useState(ranStatus[1]?.count > 0 ? true : false);
  const [mimo, setMimo] = useState(false);
  const [siso, setSiso] = useState(true);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setRanCount(ranStatus[1]?.count);
    if (ranStatus && ranStatus[1]?.count > 0) {
      setRanActive(true)
    }
    else if(ranStatus[1]?.count.length==0){
      setRanActive(false)
    }
  }, [ranStatus])

  const handleMimo = () => {
    setMimo(true);
    setSiso(false);
  }
  const handleSiso = () => {
    setSiso(true);
    setMimo(false);
  }

  const handleButtonClick = async () => {
    if (ranActive) {
      try {
        setLoading(true);
        const response = await _getRanStop();
        
        if(response[0]=='RAN Stopped'){
          toast.success('Ran stopped successfully!');
          setRanActive(false);
        }
        else{
          toast.error('Ran still running!');
        }

      } catch (err) {
        toast.error('Ran still running!');
      } finally {
        setLoading(false);        
      }
    }
    else {
      if (mimo) {
        
        try {
          setLoading(true);
          const response = await _getRanDeploy1();
          
          if (response[1].count > 0 && response[0].status!='Unable to create radio session') {
            setRanActive(true);
            toast.success('Ran started successfully in Mimo config!');
          }
          else {
            setRanActive(false)
            toast.error('Ran deployment error in Mimo config!')
          }
          
        } catch (err) {
          toast.error(' Ran deployment error in Mimo config!');
          setRanActive(false);
        } finally {
          setLoading(false);
        }
      }
      else if (siso) {
        try {
          setLoading(true);
          const response = await _getRanDeploy();
          
          if (response[1].count > 0 && response[0].status!='Unable to create radio session') {
            setRanActive(true);
            toast.success('Ran started successfully in Siso config!');
          }
          else {
            setRanActive(false)
            toast.error('Ran deployment error in Siso config!')
          }
          
        } catch (err) {
          toast.error(' Ran deployment error in Siso config!');
          setRanActive(false);
        } finally {
          setLoading(false);
        }
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.heading}>5G Radio Access Network</div>
          <div className={styles.count}>{ranCount > 0 ? ranCount : "0"}</div>
        </div>
        <div className={styles.mid}>
          <div className={styles.mimo} style={mimo ? { backgroundColor: '#50d328' } : { backgroundColor: '#ee5252' }} onClick={handleMimo}>Mimo</div>
          <div className={styles.siso} style={siso ? { backgroundColor: '#50d328' } : { backgroundColor: '#ee5252' }} onClick={handleSiso}>Siso</div>
        </div>
        <div className={styles.right}>
          {
            loading ? (
              <div className={styles.load}></div>
            ) : (
              <div className={styles.box} onClick={handleButtonClick}>
                <div className={styles.icon}>
                  <PiPowerFill style={ranActive ? { color: 'rgb(207, 40, 11)' } : { color: 'rgb(27, 199, 27)' }} />
                </div>
                <div className={styles.text}>
                  {ranActive ? "Stop" : "Start"}
                </div>
              </div>
            )
          }

        </div>
      </div>
      <div className={styles.body}>
        {ranCount > 0 ? (
          <>
            <div className={styles.row}>
              <div className={styles.leftr}>
                <div className={styles.num}>
                  1
                </div>
                <div className={styles.hori}></div>
                <div className={styles.rtext}>
                  gNodeB ID :{ranStatus?.[0]?.ID}
                </div>
              </div>
              <div className={styles.rightr}>
                <div className={styles.hori}></div>
                <div className={styles.ltext} style={ranCount > 0 ? { color: 'rgb(12, 197, 12)' } : { color: 'red' }}>
                  Running
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
          </>
        ) : "No ran running"}
      </div>
      <div className={styles.footer}>
        <div></div>
        <div className={styles.configure}>
          <div className={styles.conicon}><IoMdSettings /></div>
          <div className={styles.context}>Configure</div>
        </div>
      </div>
    </div>
  )
}

export default Ran