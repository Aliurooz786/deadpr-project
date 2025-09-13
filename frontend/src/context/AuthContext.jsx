import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const setUserFromToken = (token) => {
        try {
            const decodedPayload = jwtDecode(token);
            if (decodedPayload.exp * 1000 > Date.now()) {
                const userData = {
                    sub: decodedPayload.sub,
                    email: decodedPayload.sub,
                    role: decodedPayload.roles[0],
                    exp: decodedPayload.exp,
                    iat: decodedPayload.iat,
                };
                setUser(userData);
            } else {
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            localStorage.removeItem('token');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUserFromToken(token);
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            const { jwtToken } = response.data;
            localStorage.setItem('token', jwtToken);
            setUserFromToken(jwtToken);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            alert(error.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    const register = async (userData) => {
        try {
            await registerUser(userData);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            alert(error.response?.data?.message || "Registration failed. Please try again.");
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
