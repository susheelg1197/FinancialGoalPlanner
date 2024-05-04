import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
    };

    console.log({ authToken, setAuthToken, logout });
    return (
        <AuthContext.Provider value={{ authToken, setAuthToken: login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};