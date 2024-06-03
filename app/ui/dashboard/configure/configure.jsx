"use client"

import styles from './configure.module.css'
import { _getDockerDownResponse, _getDockerUpResponse } from '@/app/api/api';
import { useConfig } from '../../../context/ConfigContext';
import { useEffect, useState } from 'react';
import { FaChevronRight } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import { PiPowerFill } from "react-icons/pi";

const getStatusColor = (status) => status === 'running' ? 'rgb(27, 199, 27)' : 'red';

const CoreComponent = ({ name, status }) => (
    <div className={styles.col}>
        <div className={styles.circle} style={{ backgroundColor: getStatusColor(status) }}></div>
        {name}
    </div>
);


const Configure = ({ ranStatus, coreStatus = { Name: [], status: [], since: [], uptime: [] } }) => {
    const { selectedConfig, setSelectedConfig } = useConfig();

    useEffect(() => {
        if (!selectedConfig) {
            setSelectedConfig('core');
        }
    }, [selectedConfig, setSelectedConfig]);

    const [loading, setLoading] = useState(false)
    const [coreActive, setCoreActive] = useState(coreStatus.status[0]?.includes('running') ?? false);
    const [mcc, setMcc] = useState('');
    const [mnc, setMnc] = useState('');
    const [tac, setTac] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!mcc) {
            setError1('MCC is required.');
        } else {
            setError1('');
            // proceed with form submission or other logic
        }
        if (!mnc) {
            setError2('MNC is required.');
        } else {
            setError2('');
            // proceed with form submission or other logic
        }
        if (!tac) {
            setError3('TAC is required.');
        } else {
            setError3('');
            // proceed with form submission or other logic
        }
    };

    const clearForm = ()=>{
        setMcc('');
        setMnc('');
        setTac('');
        setError1('');
        setError2('');
        setError3('');
    }

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
    ])

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

    return (
        <div className={styles.container}>
            <div className={styles.col1}>
                <div className={`${styles.btn} ${selectedConfig == 'core' ? styles.selectedcore : ''}`} onClick={() => setSelectedConfig('core')}>
                    <div className={styles.txtico}>
                        <div className={styles.coretxt}>1. Configure Core Network</div>
                        <div className={styles.arrow}>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>

                <div className={`${styles.rbtn} ${selectedConfig == 'ran' ? styles.selectedcore : ''}`} onClick={() => setSelectedConfig('ran')}>
                    <div className={styles.txtico}>
                        <div className={styles.rantxt}>2. Configure 5G Radio Access Network</div>
                        <div className={styles.arrow}>
                            <FaChevronRight />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.col2}></div>
            <div className={`${styles.col3} ${selectedConfig == 'core' ? styles.corecol3 : ''}`}>
                {
                    selectedConfig == 'core' ? (
                        <div className={styles.corecontainer}>
                            <div className={styles.headcore}>
                                <div></div>
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
                            <div className={styles.form1}>
                                <form onSubmit={handleSubmit}>
                                    <div className={styles.row1}>
                                        <div className={styles.mcc}>
                                            <div className={styles.label}>MCC*</div>
                                            <input
                                                autoComplete="off"
                                                className={styles.input} type="text"
                                                placeholder="001"
                                                name="mcc"
                                                value={mcc}
                                                onChange={(e) => setMcc(e.target.value)}
                                                style={error1 ? { border: '1px solid red' } : {}}
                                            />
                                            {error1 && <div className={styles.err}>{error1}</div>}
                                        </div>
                                        <div className={styles.mnc}>
                                            <div className={styles.label}>MNC*</div>
                                            <input
                                                autoComplete="off"
                                                className={styles.input} type="text"
                                                placeholder="01"
                                                name="mnc"
                                                value={mnc}
                                                onChange={(e) => setMnc(e.target.value)}
                                                style={error2 ? { border: '1px solid red' } : {}}
                                            />
                                            {error2 && <div className={styles.err}>{error2}</div>}
                                        </div>
                                        <div className={styles.tac}>
                                            <div className={styles.label}>TAC*</div>
                                            <input
                                                autoComplete="off"
                                                className={styles.input} type="text"
                                                placeholder="7"
                                                name="tac"
                                                value={tac}
                                                onChange={(e) => setTac(e.target.value)}
                                                style={error3 ? { border: '1px solid red' } : {}}
                                            />
                                            {error3 && <div className={styles.err}>{error3}</div>}
                                        </div>
                                    </div>

                                    <div className={styles.buttons}>
                                        <button type='Submit'>Save Changes</button>
                                        <div className={styles.cancel} onClick={clearForm}>Cancel</div>
                                    </div>
                                   
                                </form>
                            </div>    
                            <div className={styles.default}>Change to Default Settings</div>                     
                      </div>
                    ) : (
                        <div>Ran</div>
                    )
                }
            </div>

        </div>
    );
};

export default Configure;
