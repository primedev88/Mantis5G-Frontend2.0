import React, { createContext, useState, useEffect, useRef } from 'react';
import { _getDockerPSResponse, _getPacketCapture, _getRanStatus, _getUeStatus, _speedTest, _getipaddress } from '../api/api';

export const DataContext = createContext();

const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

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

export const DataProvider = ({ children }) => {
    const [coreStatus, setCoreStatus] = useState({ Name: [], status: [] ,since:[],uptime:[]});
    const [ranStatus, setRanStatus] = useState([]);
    const [ueStatus, setUeStatus] = useState({
        count: [],
        rnti: [],
        ul_rate: [],
        dl_rate: [],
    });
    const [packetCapture, setPacketCapture] = useState([]);
    const [ip, setIp] = useState('');
    const [speed, setSpeed] = useState(0);
   
    //useEffect to initialize all datas as the component mounts
    useEffect(() => {
        _getDockerPSResponse()
            .then(data => {
                setCoreStatus(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
        _getRanStatus()
            .then(data => {
                setRanStatus(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
        _speedTest()
            .then(data => {
                setSpeed(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
        _getipaddress()
            .then(data => {
                setIp(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
        _getPacketCapture()
            .then(data => {                
                if (Array.isArray(data) && data.length > 0) {
                    setPacketCapture((prevData) => [...prevData, ...data.reverse()]);
                } else {
                    console.error('Empty or unexpected response from _getPacketCapture');
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });

    }, []);

    useInterval(() => {
        _getUeStatus()
            .then(data => {
                setUeStatus(data); // This will log the resolved data              
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, 1000)

    useInterval(() => {
        _getDockerPSResponse()
            .then(data => {
                setCoreStatus(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
        _getRanStatus()
            .then(data => {
                setRanStatus(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, 3000)


    useInterval(() => {
        _speedTest()
            .then(data => {
                setSpeed(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
        _getipaddress()
            .then(data => {
                setIp(data); // This will log the resolved data
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, 60000)

    useInterval(() => {
        _getPacketCapture()
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setPacketCapture([...data.reverse()]);
                } else {
                    console.log('Empty or unexpected response from _getPacketCapture');
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });
    }, 10000)

    return (
        <DataContext.Provider value={{ coreStatus, ranStatus, ueStatus, packetCapture , ip , speed }}>
            {children}
        </DataContext.Provider>
    );
};
