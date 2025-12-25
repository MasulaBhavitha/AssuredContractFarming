import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        if (localStorage.getItem('token')) {
            try {
                const res = await api.get('/auth/user');
                setUser(res.data);
                setIsAuthenticated(true);
            } catch (err) {
                localStorage.removeItem('token');
                setUser(null);
                setIsAuthenticated(false);
            }
        }
        setLoading(false);
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            await loadUser();
            return { success: true };
        } catch (err) {
            console.error("Login error", err.response?.data);
            return { success: false, error: err.response?.data?.msg || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const res = await api.post('/auth/register', userData);
            localStorage.setItem('token', res.data.token);
            await loadUser();
            return { success: true };
        } catch (err) {
            console.error("Register error", err.response?.data);
            return { success: false, error: err.response?.data?.msg || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
