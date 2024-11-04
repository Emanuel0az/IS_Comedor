import React, { createContext, useState, useContext } from 'react';
export const IdContext = createContext();

export const useIdContext = () => useContext(IdContext)

export const IdProvider = ({ children }) => {
    const [contextId, setContextId] = useState();
    return (
        <IdContext.Provider value={{ contextId, setContextId }}>
            {children}
        </IdContext.Provider>
    );
};
