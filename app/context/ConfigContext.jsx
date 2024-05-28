import { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    const [selectedConfig, setSelectedConfig] = useState(null);

    return (
        <ConfigContext.Provider value={{ selectedConfig, setSelectedConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
