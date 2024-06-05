"use client"

import React, { useEffect, useState } from 'react'
import styles from './coreConfig.module.css'
import { _getDockerDownResponse, _getDockerUpResponse, _postCoreConfig } from '@/app/api/api';
import { toast } from 'react-hot-toast';
import { PiPowerFill } from "react-icons/pi";

const getStatusColor = (status) => status === 'running' ? 'rgb(27, 199, 27)' : 'red';

const CoreComponent = ({ name, status }) => (
    <div className={styles.col}>
        <div className={styles.circle} style={{ backgroundColor: getStatusColor(status) }}></div>
        {name}
    </div>
);

const CoreConfig = ({ coreStatus = { Name: [], status: [], since: [], uptime: [] } }) => {
    const [loading, setLoading] = useState(false)
    const [coreActive, setCoreActive] = useState(coreStatus.status[0]?.includes('running') ?? false);
    const [mcc, setMcc] = useState('');
    const [mnc, setMnc] = useState('');
    const [tac, setTac] = useState('');
    const [oldmcc, setoldMcc] = useState('');
    const [oldmnc, setoldMnc] = useState('');
    const [oldtac, setoldTac] = useState('');
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const [loader, setLoader] = useState(false);
    const [loader1, setLoader1] = useState(false);
    const [isdefault, setDefault] = useState(true);
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

    useEffect(() => {
        const storedMcc = sessionStorage.getItem('mcc');
        const storedMnc = sessionStorage.getItem('mnc');
        const storedTac = sessionStorage.getItem('tac');

        if (storedMcc) setMcc(storedMcc);
        if (storedMnc) setMnc(storedMnc);
        if (storedTac) setTac(storedTac);
    }, []);

    useEffect(() => {
        sessionStorage.setItem('mcc', mcc);
    }, [mcc]);

    useEffect(() => {
        sessionStorage.setItem('mnc', mnc);
    }, [mnc]);

    useEffect(() => {
        sessionStorage.setItem('tac', tac);
    }, [tac]);

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        if (!mcc) {
            setError1('MCC is required.');
            isValid = false;
        } else {
            setError1('');
        }

        if (!mnc) {
            setError2('MNC is required.');
            isValid = false;
        } else {
            setError2('');
        }

        if (!tac) {
            setError3('TAC is required.');
            isValid = false;
        } else {
            setError3('');
        }

        if (isValid) {
            if (mcc == "001" && mnc == "01" && tac == "7" && isdefault) {
                toast.error('Core is already in default config')
            }
            else if (mcc == oldmcc && mnc == oldmnc && tac == oldtac) {
                toast.success('Core is already in this config')
            }
            else {
                setoldMcc(mcc);
                setoldMnc(mnc);
                setoldTac(tac);
                if (mcc == "001" && mnc == "01" && tac == "7") {
                    setDefault(true);
                }
                else {
                    setDefault(false);
                }

                if (coreActive) {
                    try {

                        const response = await _getDockerDownResponse();

                    } catch (err) {
                        toast.error('Core still running!');
                    } finally {

                        setCoreActive(false);
                        toast.success('Core stopped successfully!');
                    }
                }
                setLoader(true);
                const data = { mcc, mnc, tac };

                try {
                    const result = await _postCoreConfig(data);
                    toast.success('Submission successful');

                } catch (error) {
                    toast.error('Submission failed:');

                } finally {
                    setLoader(false);
                }
            }
        }
    };
    const changeDeafult = async () => {

        if (mcc == "001" && mnc == "01" && tac == "7" && isdefault) {
            toast.error('Core is already in default config')
        }
        else {
            setMcc('001');
            setMnc('01');
            setTac('7');
            setoldMcc('001');
            setoldMnc('01');
            setoldTac('7');
            setDefault(true);

            if (coreActive) {
                try {

                    const response = await _getDockerDownResponse();

                } catch (err) {
                    toast.error('Core still running!');
                } finally {

                    setCoreActive(false);
                    toast.success('Core stopped successfully!');
                }
            }
            setLoader1(true);
            const data = {
                mcc: "001",
                mnc: "01",
                tac: "7"
            };

            try {
                const result = await _postCoreConfig(data);
                toast.success('Submission successful');

            } catch (error) {
                toast.error('Submission failed:');

            } finally {
                setLoader1(false);
            }
        }
    }

    const clearForm = () => {
        setMcc('');
        setMnc('');
        setTac('');
        setError1('');
        setError2('');
        setError3('');
    }
    return (
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
                    <div className={styles.ip}>
                        <div className={styles.ipcol1}>
                            <div className={styles.docker}>
                                <div className={styles.dlabel}>AMF IP</div>
                                <div className={styles.dcon}>
                                    <div className={styles.ipcom}>127</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>5</div>
                                </div>
                            </div>
                            <div className={styles.docker}>
                                <div className={styles.dlabel}>UDM IP</div>
                                <div className={styles.dcon}>
                                    <div className={styles.ipcom}>127</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>12</div>
                                </div>
                            </div>
                            <div className={styles.docker}>
                                <div className={styles.dlabel}>SMF IP</div>
                                <div className={styles.dcon}>
                                    <div className={styles.ipcom}>127</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>4</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ipcol2}>
                            <div className={styles.docker}>
                                <div className={styles.dlabel}>UPF IP</div>
                                <div className={styles.dcon}>
                                    <div className={styles.ipcom}>127</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>7</div>
                                </div>
                            </div>
                            <div className={styles.docker}>
                                <div className={styles.dlabel}>AUSF IP</div>
                                <div className={styles.dcon}>
                                    <div className={styles.ipcom}>127</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>11</div>
                                </div>
                            </div>
                            <div className={styles.docker}>
                                <div className={styles.dlabel}>NRF IP</div>
                                <div className={styles.dcon}>
                                    <div className={styles.ipcom}>127</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>0</div>
                                    <div>.</div>
                                    <div className={styles.ipcom}>10</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <button type='Submit'>{loader ? "Loading..." : "Save Changes"}</button>
                        <div className={styles.cancel} onClick={clearForm}>Cancel</div>
                    </div>

                </form>
            </div>
            <div className={styles.default} onClick={changeDeafult}>{loader1 ? "Loading..." : "Change to Default Settings"}</div>
        </div>
    )
}

export default CoreConfig