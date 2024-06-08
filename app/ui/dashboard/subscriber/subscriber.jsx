

import React from 'react'
import styles from './subscriber.module.css'
import { IoAdd } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";


const Subscriber = () => {
    const data = {
        "total_count": 4,
        "subscribers": [
            {
                "imsi": "001010000000001",
                "created_at": "2024-06-08T12:47:23.530000+05:30"
            },
            {
                "imsi": "001010000000002",
                "created_at": "2024-06-08T12:48:15.284000+05:30"
            },
            {
                "imsi": "001010000000003",
                "created_at": "2024-06-08T12:48:23.921000+05:30"
            },
            {
                "imsi": "001010000000004",
                "created_at": "2024-06-08T12:48:31.715000+05:30"
            }
        ]
    }
    return (
        <div className={styles.container}>
            <div className={styles.rw1}>
                <div className={styles.lt1}>
                    <div className={styles.tx1}>Subscribers</div>

                </div>
                <div className={styles.rt1}>
                    <div className={styles.add}>
                        <div className={styles.ico}>
                            <IoAdd />
                        </div>
                        <div className={styles.rtxt1}>
                            Add New
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rw2}></div>
            <div className={styles.rw3}>
                <div className={styles.lt3}>
                    <div className={styles.del}>
                        <div className={styles.ico2}>
                            <RiDeleteBin5Fill />
                        </div>
                        <div className={styles.rtxt1}>
                            Delete
                        </div>
                    </div>
                </div>
                <div className={styles.rt3}></div>
            </div>
        </div>
    )
}

export default Subscriber