// ColorContext.js
import React, { createContext, useState } from 'react';

// Creamos el contexto
export const ColorContext = createContext();

// Creamos el proveedor de contexto
export const ColorProvider = ({ children }) => {
    const [ContextColorState, setContextColorState] = useState(false);

    return (
        <ColorContext.Provider value={{ ContextColorState, setContextColorState }}>
            {children}
        </ColorContext.Provider>
    );
};
