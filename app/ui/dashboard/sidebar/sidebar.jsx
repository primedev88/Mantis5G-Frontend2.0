"use client"

import styles from './sidebar.module.css';
import {
  MdDashboard,
  MdLogout
} from 'react-icons/md';
import { RiRestartFill } from "react-icons/ri";
import { IoDocumentText, IoEye } from "react-icons/io5";
import { VscBroadcast } from "react-icons/vsc";
import { TbLogout2 } from "react-icons/tb";
import { FaSimCard } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MenuLink from './menuLink/menuLink';
import { useEffect, useState } from 'react';

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard />
  },
  {
    title: "Configure",
    path: "/dashboard/configure",
    icon: <VscBroadcast />
  },
  {
    title: "Monitor",
    path: "/dashboard/monitor",
    icon: <IoEye />
  },
  {
    title: "Subscribers",
    path: "/dashboard/subscriber",
    icon:<FaSimCard />
  },
  {
    title: "Logs",
    path: "/dashboard/logs",
    icon: <IoDocumentText />
  }

]

const Sidebar = ({ranStatus , ueStatus , coreStatus ,ip , speed, onRestartClick}) => {
  const [ranCount,setRanCount] = useState(ranStatus?.[1]?.count ?? 0);
  const [ueCount,setUeCount] = useState(ueStatus?.count??0);
  const [activeServicesCount,setActiveServices] = useState(coreStatus?.status?.filter(status => status === "active (running)").length ?? 0);
  const [internetSpeed,setSpeed] = useState(0)
  const [Ip,setIp] = useState('');

  useEffect(()=>{
    setRanCount(ranStatus?.[1]?.count ?? 0);
    setUeCount(ueStatus?.count??0);
    setActiveServices(coreStatus?.status?.filter(status => status === "active (running)").length ?? 0);
    setIp(ip);
    setSpeed(speed?.Download?.includes("Check Internet Connection")?"Internet Connection Error":parseInt(speed?.Download??0));
  },[ranStatus , ueStatus , coreStatus ,ip , speed])


  const router = useRouter();

  const handleLogOut = async () => {
    sessionStorage.removeItem('isLoggedIn');
    router.push('/');
  };
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image
          className={styles.image}
          src="/logo@2x.png"
          alt=""
          width="200"
          height="50"
        />
      </div>
      <div className={styles.ulList}>
        <ul className={styles.list}>
          {menuItems.map((item,index) => (
            <li key={index}><MenuLink item={item} key={index} /></li>
          ))}
        </ul>
        <button onClick={onRestartClick}>
          <div className={styles.resicon}>
            <RiRestartFill />
          </div>
          <div className={styles.restext}>
            Restart Box
          </div>
        </button>
      </div>
      <div className={styles.quickStats}>
          <div className={styles.quicktext}>
            Quick Stats
          </div>
          <div className={styles.device}>
            <div className={styles.img}>
              <Image
                className={styles.image}
                src="/sidebar/g1392@2x.png"
                alt=""
                width="20"
                height="20"
              />
            </div>
            <div className={styles.status}>
              <div className={styles.devicetitle}>Core Status</div>
              <div className={styles.devicestatus}>{activeServicesCount==5?"Running":"Not Running"}</div>
            </div>
          </div>
          <div className={styles.device}>
            <div className={styles.img}>
              <Image
                className={styles.image}
                src="/sidebar/Icon@2x.png"
                alt=""
                width="20"
                height="20"
              />
            </div>
            <div className={styles.status}>
              <div className={styles.devicetitle}>Rans Connected</div>
              <div className={styles.devicestatus}>{ranCount>0?ranCount:"0"}</div>
            </div>
          </div>
          <div className={styles.device}>
            <div className={styles.img}>
              <Image
                className={styles.image}
                src="/sidebar/Connect_1_@2x.png"
                alt=""
                width="20"
                height="20"
              />
            </div>
            <div className={styles.status}>
              <div className={styles.devicetitle}>Connected Devices</div>
              <div className={styles.devicestatus}>{ueCount>0?ueCount:"0"}/100</div>
            </div>
          </div>
          <div className={styles.device}>
            <div className={styles.img}>
              <Image
                className={styles.image}
                src="/sidebar/Group 9@2x.png"
                alt=""
                width="20"
                height="20"
              />
            </div>
            <div className={styles.status}>
              <div className={styles.devicetitle}>Backend Speed</div>
              <div className={styles.devicestatus}>{internetSpeed} {internetSpeed=="Internet Connection Error"?"":"Mbps"}</div>
            </div>
          </div>
          <div className={styles.device}>
            <div className={styles.img}>
              <Image
                className={styles.image}
                src="/sidebar/Layer 3@2x.png"
                alt=""
                width="20"
                height="20"
              />
            </div>
            <div className={styles.status}>
              <div className={styles.devicetitle}>IP</div>
              <div className={styles.devicestatus}>{Ip}</div>
            </div>
          </div>
      </div>
      <button className={styles.logout} onClick={handleLogOut}>
        <div className={styles.outicon}>
          <TbLogout2 />
        </div>
        <div className={styles.icontext}>
          Logout
        </div>
      </button>
      <div className={styles.copyright}>
          All Rights Reserved © Mantiswave Networks
      </div>
    </div>
  );
};

export default Sidebar;
