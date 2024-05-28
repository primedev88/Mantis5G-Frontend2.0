"use client"

import { useConfig } from '../../../context/ConfigContext';
import { useEffect } from 'react';

const Configure = () => {
    const { selectedConfig, setSelectedConfig } = useConfig();

    useEffect(() => {
        if (!selectedConfig) {            
            setSelectedConfig('core');
        }
    }, [selectedConfig, setSelectedConfig]);

    return (
        <div>
            <div
                onClick={() => setSelectedConfig('core')}
                style={{
                    padding: '20px',
                    margin: '10px',
                    border: selectedConfig === 'core' ? '2px solid blue' : '2px solid gray',
                    cursor: 'pointer'
                }}
            >
                Core Config
            </div>
            <div
                onClick={() => setSelectedConfig('ran')}
                style={{
                    padding: '20px',
                    margin: '10px',
                    border: selectedConfig === 'ran' ? '2px solid blue' : '2px solid gray',
                    cursor: 'pointer'
                }}
            >
                RAN Config
            </div>
        </div>
    );
};

export default Configure;
