"use client"

import Link from 'next/link'
import styles from './menuLink.module.css'
import { usePathname } from 'next/navigation'
import { FaChevronRight } from "react-icons/fa";

const MenuLink = ({item}) => {

  const pathname = usePathname()

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      <div className={styles.group}>
        {item.icon}
        <div className={styles.title}>
          {item.title}
        </div>
      </div>
      <div className={`${styles.arrow} ${pathname === item.path && styles.activeArrow}`}>
        <FaChevronRight />
      </div>
      
    </Link>
  )
}

export default MenuLink