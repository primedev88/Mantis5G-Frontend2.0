import Core from '../ui/dashboard/core/core';
import styles from '../ui/dashboard/dashboard.module.css'
import Packetflow from '../ui/dashboard/packetflow/packetflow';
import Ran from '../ui/dashboard/ran/ran';
import Ue from '../ui/dashboard/ue/ue';

const Dashboard = () => {
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.progress}>
        <div className={styles.bar}>Status</div>
      </div>
      <div className={styles.info}>
        <div className={styles.core}>
          <Core/>
        </div>
        <div className={styles.ran}>
          <Ran/>
        </div>
        <div className={styles.ue}>
          <Ue/>
        </div>
        <div className={styles.packet}>
          <Packetflow/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
