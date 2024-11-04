import React, { createContext, useState, useContext } from 'react';
export const IdContext = createContext();

export const useIdContext = () => useContext(IdContext)

export const IdProvider = ({ children }) => {

    const [contextId, setContextId] = useState();
    const [user, setUser] = useState();
    const [colorState, setColorState] = useState();


    return (

        <IdContext.Provider value={{ contextId, setContextId, user, setUser, colorState, setColorState }}>
            {children}
        </IdContext.Provider>
    );

};
