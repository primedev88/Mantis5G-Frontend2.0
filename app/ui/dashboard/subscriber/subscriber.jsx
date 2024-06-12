"use client"

import React, { useEffect, useState } from 'react'
import styles from './subscriber.module.css'
import { IoAdd } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { _getTotalSubscribers, _postAddSubs, _postDelSubs } from '@/app/api/api';
import { toast } from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

const Subscriber = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState([]);
    const [data, setData] = useState({ subscribers: [], total_count: 0 })
    const [subscribers, setSubscribers] = useState([]);
    useEffect(() => {
        _getTotalSubscribers()
            .then(data => {
                setData(data);
                setSubscribers(data?.subscribers)
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, [])

    const totalPages = Math.ceil(subscribers.length / ITEMS_PER_PAGE);

    const handleCheckboxChange = (imsi) => {
        setSelectedRows(prev =>
            prev.includes(imsi) ? prev.filter(id => id !== imsi) : [...prev, imsi]
        );
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentPageData = subscribers.slice(startIndex, startIndex + ITEMS_PER_PAGE);


    const handleDelete = async () => {
        const selectedIMSI = selectedRows;

 

        try {
            const response = await _postDelSubs({ imsis: selectedIMSI });

            if (response && response.message) {
                toast.success(response.message);
            } else {
                toast.success("Subscribers deleted successfully");
            }

            _getTotalSubscribers()
                .then(data => {
                    setData(data);
                    setSubscribers(data?.subscribers);
                })
                .catch(err => {
                    console.error('Error:', err);
                });

            setSelectedRows([]);
        } catch (error) {
            if (error && error.message) {
                toast.error(error.message);
            } else {
                toast.error("An error occurred while deleting subscribers");
            }
        }
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        date.setHours(date.getHours() + 5); // Add 5 hours
        date.setMinutes(date.getMinutes() + 30); // Add 30 minutes
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed in JavaScript
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${day}/${month}/${year}, ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

    };

    const handleAdd = async () => {
        try {

          const currentIMSIs = subscribers.map(sub => parseInt(sub.imsi.slice(12), 14));
          let newIMSI = 1;
          while (currentIMSIs.includes(newIMSI)) {
            newIMSI += 1;
          }
          const imsiPart2=10000000000+newIMSI;
          const imsiPart1="0010";
          const newIMSIString = imsiPart1+imsiPart2.toString();
          console.log(newIMSIString)

          const response = await _postAddSubs({ imsi: newIMSIString });

          toast.success(`Added subscriber with IMSI: ${newIMSIString}`);

          const updatedData = await _getTotalSubscribers();
          setData(updatedData);
          setSubscribers(updatedData?.subscribers || []);
        } catch (error) {

          toast.error("An error occurred while adding the subscriber");
        }
      };
      
    return (
        <div className={styles.container}>
            <div className={styles.rw1}>
                <div className={styles.lt1}>
                    <div className={styles.tx1}>Subscribers</div>

                </div>
                <div className={styles.rt1}>
                    <div className={styles.add} onClick={handleAdd}>
                        <div className={styles.ico}>
                            <IoAdd />
                        </div>
                        <div className={styles.rtxt1}>
                            Add New
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.rw2}>
                <table className={styles.table}>
                    <thead >
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>IMSI</th>
                            <th>Date Created</th>
                            <th>APN</th>
                        </tr>

                    </thead>

                    <tbody>
                        {currentPageData?.map((subscriber, index) => (
                            <tr key={subscriber.imsi} style={selectedRows.includes(subscriber.imsi) ? { backgroundColor: '#89898940' } : { backgroundColor: '#0D0C0E' }}>
                                <td className={styles.corner} style={selectedRows.includes(subscriber.imsi) ? { backgroundColor: '#F36F41' } : { backgroundColor: '#0D0C0E' }}></td>
                                <td>
                                    <input
                                        className={styles.check}
                                        type="checkbox"
                                        checked={selectedRows.includes(subscriber.imsi)}
                                        onChange={() => handleCheckboxChange(subscriber.imsi)}

                                    />
                                </td>
                                <td>Device {parseInt(subscriber.imsi) % 1000}</td>
                                <td>{subscriber.imsi}</td>
                                <td>{formatDate(subscriber.created_at)}</td>
                                <td>{subscriber.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.rw3}>
                <div className={styles.lt3}>
                    <div className={styles.del} style={selectedRows.length > 0 ? { backgroundColor: '#C51E1D' } : { backgroundColor: '#525252' }} onClick={handleDelete}>
                        <div className={styles.ico2}>
                            <RiDeleteBin5Fill />
                        </div>
                        <div className={styles.rtxt1}>
                            Delete
                        </div>
                    </div>
                </div>
                <div className={styles.rt3}>
                    <div className={styles.pagination}>
                        <button
                            className={styles.arrow}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <MdOutlineKeyboardArrowLeft style={currentPage === 1 ? { fontSize: '30px', color: '#727273' } : { fontSize: '30px', color: '#ffffff' }} />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`${styles.num} ${currentPage === index + 1 ? styles.active : ''}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={styles.arrow}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <MdOutlineKeyboardArrowRight style={currentPage === totalPages ? { fontSize: '30px', color: '#727273' } : { fontSize: '30px', color: '#ffffff' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscriber