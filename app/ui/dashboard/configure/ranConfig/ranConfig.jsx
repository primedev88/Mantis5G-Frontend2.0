"use client"

import React, { useEffect, useState } from 'react'
import { PiPowerFill } from "react-icons/pi";
import { _getRanDeploy, _getRanDeploy1, _getRanStop, _postSisoConfig, _postMimoConfig } from '@/app/api/api';
import { toast } from 'react-hot-toast';
import styles from './ranConfig.module.css'

const RanConfig = ({ ranStatus }) => {
  const [ranCount, setRanCount] = useState(0);
  const [ranActive, setRanActive] = useState(ranStatus[1]?.count > 0 ? true : false);
  const [mimo, setMimo] = useState(false);
  const [siso, setSiso] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  const [isdefault, setDefault] = useState(true);

  const [srate, setSrate] = useState('');
  const [txgain, setTxgain] = useState('');
  const [rxgain, setRxgain] = useState('');
  const [chbw, setChbw] = useState('');
  const [ulant, setUlant] = useState('');
  const [dlant, setDlant] = useState('');

  const [oldsrate, setoldSrate] = useState('');
  const [oldtxgain, setoldTxgain] = useState('');
  const [oldrxgain, setoldRxgain] = useState('');
  const [oldchbw, setoldChbw] = useState('');
  const [oldulant, setoldUlant] = useState('');
  const [olddlant, setoldDlant] = useState('');
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [error4, setError4] = useState('');
  const [error5, setError5] = useState('');

  useEffect(() => {
    const storedSrate = sessionStorage.getItem('srate');
    const storedTX = sessionStorage.getItem('txgain');
    const storedRX = sessionStorage.getItem('rxgain');
    const storedBw = sessionStorage.getItem('chbw');
    const storedUa = sessionStorage.getItem('ulant');
    const storedDa = sessionStorage.getItem('dlant');

    if (storedSrate) setSrate(storedSrate);
    if (storedTX) setTxgain(storedTX);
    if (storedRX) setRxgain(storedRX);
    if (storedBw) setChbw(storedBw);
    if (storedUa) setUlant(storedUa);
    if (storedDa) setDlant(storedDa);

  }, []);

  useEffect(() => {
    sessionStorage.setItem('srate', srate);
  }, [srate]);

  useEffect(() => {
    sessionStorage.setItem('txgain', txgain);
  }, [txgain]);

  useEffect(() => {
    sessionStorage.setItem('rxgain', rxgain);
  }, [rxgain]);

  useEffect(() => {
    sessionStorage.setItem('chbw', chbw);
  }, [chbw]);

  useEffect(() => {
    sessionStorage.setItem('ulant', ulant);
  }, [ulant]);

  useEffect(() => {
    sessionStorage.setItem('dlant', dlant);
  }, [dlant]);


  useEffect(() => {
    setRanCount(ranStatus[1]?.count);
    if (ranStatus && ranStatus[1]?.count > 0) {
      setRanActive(true)
    }
    else {
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

        if (response[0] == 'RAN Stopped') {
          toast.success('Ran stopped successfully!');
          setRanActive(false);
        }
        else {
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

          if (response[1].count > 0 && response[0].status != 'Unable to create radio session') {
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

          if (response[1].count > 0 && response[0].status != 'Unable to create radio session') {
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

  const handleSubmitSiso = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!chbw) {
      setError2('Bandwidth is required.');
      isValid = false;
    } else {
      setError2('');
    }

    if (!txgain) {
      setError1('TX Gain is required.');
      isValid = false;
    } else {
      setError1('');
    }
    if (!rxgain) {
      setError3('RX Gain is required.');
      isValid = false;
    } else {
      setError3('');
    }

    if (isValid) {
      if (srate == "23.04" && txgain == "80" && rxgain == "76" && chbw == "20" && isdefault) {
        toast.error('RAN is already in default config')
      }
      else if (txgain == oldtxgain && rxgain == oldrxgain && chbw == oldchbw) {
        toast.success('RAN is already in this config')
      }
      else {
        let sr = '23.04'
        setoldChbw(chbw);
        setoldTxgain(txgain);
        setoldRxgain(rxgain);
        if (chbw > 20) {
          setSrate('53.76');
          sr = '53.76'
        }
        else setSrate('23.04')

        if (chbw == '20' && txgain == '80' && rxgain == '76') {
          setDefault(true);
        }
        else setDefault(false)

        if (ranActive) {
          try {

            const response = await _getRanStop();

            if (response[0] == 'RAN Stopped') {
              toast.success('Ran stopped successfully!');
              setRanActive(false);
            }
            else {
              toast.error('Ran still running!');
            }

          } catch (err) {
            toast.error('Ran still running!');
          } finally {

          }
        }
        setLoader(true);
        const data = {
          "srate": sr,
          "tx_gain": txgain,
          "rx_gain": rxgain,
          "channel_bandwidth_MHz": chbw
        }
        try {
          const result = await _postSisoConfig(data);
          toast.success('Submission successful');

        } catch (error) {
          toast.error('Submission failed:');

        } finally {
          setLoader(false);
        }
      }
    }
  };

  const handleSubmitMimo = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!chbw) {
      setError2('Bandwidth is required.');
      isValid = false;
    } else {
      setError2('');
    }

    if (!txgain) {
      setError1('TX Gain is required.');
      isValid = false;
    } else {
      setError1('');
    }
    if (!rxgain) {
      setError3('RX Gain is required.');
      isValid = false;
    } else {
      setError3('');
    }
    if (!ulant) {
      setError4('Uplink Antennas is required.');
      isValid = false;
    } else {
      setError4('');
    }
    if (!dlant) {
      setError5('Downlink Antennas is required.');
      isValid = false;
    } else {
      setError5('');
    }

    if (isValid) {
      if (srate == "23.04" && txgain == "80" && rxgain == "76" && chbw == "20" && ulant == '2' && dlant == '2' && isdefault) {
        toast.error('RAN is already in default config')
      }
      else if (txgain == oldtxgain && rxgain == oldrxgain && chbw == oldchbw && ulant == oldulant && dlant == olddlant) {
        toast.success('RAN is already in this config')
      }
      else {
        let sr = '23.04'
        setoldChbw(chbw);
        setoldTxgain(txgain);
        setoldRxgain(rxgain);
        setoldDlant(dlant);
        setoldUlant(ulant);
        if (chbw > 20) {
          setSrate('53.76');
          sr = '53.76'
        }
        else setSrate('23.04')

        if (chbw == '20' && txgain == '80' && rxgain == '76' && ulant == '2' && dlant == '2') {
          setDefault(true);
        }
        else setDefault(false)

        if (ranActive) {
          try {

            const response = await _getRanStop();

            if (response[0] == 'RAN Stopped') {
              toast.success('Ran stopped successfully!');
              setRanActive(false);
            }
            else {
              toast.error('Ran still running!');
            }

          } catch (err) {
            toast.error('Ran still running!');
          } finally {

          }
        }
        setLoader(true);
        const data = {
          "srate": sr,
          "tx_gain": txgain,
          "rx_gain": rxgain,
          "channel_bandwidth_MHz": chbw,
          "nof_antennas_ul": ulant,
          "nof_antennas_dl": dlant
        }
        try {
          const result = await _postMimoConfig(data);
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
    if (srate == "23.04" && txgain == "80" && rxgain == "76" && chbw == "20" && ulant == '2' && dlant == '2' && isdefault) {
      toast.error('RAN is already in default config')
    }
    else {
      setSrate('23.04');
      setTxgain('80');
      setRxgain('76');
      setChbw('20');
      setUlant('2');
      setDlant('2');
      setoldSrate('23.04');
      setoldTxgain('80');
      setoldRxgain('76');
      setoldChbw('20');
      setoldUlant('2');
      setoldDlant('2');
      setDefault(true);

      if (ranActive) {
        try {

          const response = await _getRanStop();

          if (response[0] == 'RAN Stopped') {
            toast.success('Ran stopped successfully!');
            setRanActive(false);
          }
          else {
            toast.error('Ran still running!');
          }

        } catch (err) {
          toast.error('Ran still running!');
        } finally {

        }
        setLoader1(true);
        const data = {
          "srate": "23.04",
          "tx_gain": "80",
          "rx_gain": "76",
          "channel_bandwidth_MHz": "20",
          "nof_antennas_ul": "2",
          "nof_antennas_dl": "2"
        }
        try {
          const result = await _postMimoConfig(data);
          toast.success('Submission successful');

        } catch (error) {
          toast.error('Submission failed:');

        } finally {
          setLoader1(false);
        }
      }
    }
  }
  const clearFormSiso = () => {
    setSrate('');
    setTxgain('');
    setRxgain('');
    setChbw('');
    setError1('');
    setError2('');
    setError3('');
  }
  const clearFormMimo = () => {
    setSrate('');
    setTxgain('');
    setRxgain('');
    setChbw('');
    setUlant('');
    setDlant('');
    setError1('');
    setError2('');
    setError3('');
    setError4('');
    setError5('')
  }


  return (
    <div className={styles.corecontainer}>
      <div className={styles.headcore}>
        <div className={styles.mid}>
          <div className={styles.mimo} style={mimo ? { backgroundColor: '#50d328' } : { backgroundColor: '#ee5252' }} onClick={handleMimo}>MIMO</div>
          <div className={styles.siso} style={siso ? { backgroundColor: '#50d328' } : { backgroundColor: '#ee5252' }} onClick={handleSiso}>SISO</div>
        </div>
        <div className={styles.right}>
          {
            loading ? (
              <div className={styles.load}></div>
            ) : (
              <div className={styles.box} onClick={handleButtonClick}>
                <div className={styles.icon} >
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
      <div className={styles.middle}>Configure RAN Parameters :</div>
      <div className={styles.form1}>
        {siso ? (
          <form onSubmit={handleSubmitSiso}>
            <div className={styles.column}>
              <div className={styles.siscol1}>
                <div className={styles.content}>
                  <div className={styles.label}>Sampling Rate MHz</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="23.04"
                    name="srate"
                    value={srate}
                    disabled
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.label1}>TX Gain</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="80"
                    name="txgain"
                    value={txgain}
                    onChange={(e) => setTxgain(e.target.value)}
                    style={error1 ? { border: '1px solid red' } : {}}
                  />
                  {error1 && <div className={styles.err}>{error1}</div>}
                </div>
              </div>
              <div className={styles.siscol2}>
                <div className={styles.content}>
                  <div className={styles.label2}>Bandwidth MHz</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="20"
                    name="chbw"
                    value={chbw}
                    onChange={(e) => setChbw(e.target.value)}
                    style={error2 ? { border: '1px solid red' } : {}}
                  />
                  {error2 && <div className={styles.err}>{error2}</div>}
                </div>
                <div className={styles.content}>
                  <div className={styles.label1}>RX Gain</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="76"
                    name="rxgain"
                    value={rxgain}
                    onChange={(e) => setRxgain(e.target.value)}
                    style={error3 ? { border: '1px solid red' } : {}}
                  />
                  {error3 && <div className={styles.err}>{error3}</div>}
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <button type='Submit'>{loader ? "Loading..." : "Save Changes"}</button>
              <div className={styles.cancel} onClick={clearFormSiso}>Cancel</div>
            </div>

          </form>
        ) : (
          <form onSubmit={handleSubmitMimo}>
            <div className={styles.column}>
              <div className={styles.siscol1}>
                <div className={styles.content}>
                  <div className={styles.label}>Sampling Rate MHz</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="23.04"
                    name="srate"
                    value={srate}
                    disabled
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.label1}>TX Gain</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="80"
                    name="txgain"
                    value={txgain}
                    onChange={(e) => setTxgain(e.target.value)}
                    style={error1 ? { border: '1px solid red' } : {}}
                  />
                  {error1 && <div className={styles.err}>{error1}</div>}
                </div>
                <div className={styles.content}>
                  <div className={styles.label2}>Uplink Antennas</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="2"
                    name="ulant"
                    value={ulant}
                    onChange={(e) => setUlant(e.target.value)}
                    style={error4 ? { border: '1px solid red' } : {}}
                  />
                  {error4 && <div className={styles.err}>{error4}</div>}
                </div>
              </div>
              <div className={styles.siscol2}>
                <div className={styles.content}>
                  <div className={styles.label2}>Bandwidth MHz</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="20"
                    name="chbw"
                    value={chbw}
                    onChange={(e) => setChbw(e.target.value)}
                    style={error2 ? { border: '1px solid red' } : {}}
                  />
                  {error2 && <div className={styles.err}>{error2}</div>}
                </div>
                <div className={styles.content}>
                  <div className={styles.label1}>RX Gain</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="76"
                    name="rxgain"
                    value={rxgain}
                    onChange={(e) => setRxgain(e.target.value)}
                    style={error3 ? { border: '1px solid red' } : {}}
                  />
                  {error3 && <div className={styles.err}>{error3}</div>}
                </div>
                <div className={styles.content}>
                  <div className={styles.label}>Downlink Antennas</div>
                  <input
                    autoComplete="off"
                    className={styles.input} type="text"
                    placeholder="2"
                    name="dlant"
                    value={dlant}
                    onChange={(e) => setDlant(e.target.value)}
                    style={error5 ? { border: '1px solid red' } : {}}
                  />
                  {error5 && <div className={styles.err}>{error5}</div>}
                </div>
              </div>
            </div>
            <div className={styles.buttons}>
              <button type='Submit'>{loader ? "Loading..." : "Save Changes"}</button>
              <div className={styles.cancel} onClick={clearFormMimo}>Cancel</div>
            </div>
          </form>
        )}
      </div>
      <div className={styles.default} onClick={changeDeafult}>{loader1 ? "Loading..." : "Change to Default Settings"}</div>
    </div>
  )
}

export default RanConfig