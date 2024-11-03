import React, { createContext, useState } from 'react';
export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [ContextColorState, setContextColorState] = useState(false);
    return (
        <ColorContext.Provider value={{ ContextColorState, setContextColorState }}>
            {children}
        </ColorContext.Provider>
    );
};
