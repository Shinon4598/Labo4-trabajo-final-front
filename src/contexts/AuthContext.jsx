// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/api/auth/login', {
                email,
                password,
            });
    
            if (response.data && response.data.user) {
                const user = response.data.user; // Asegúrate de que esto es un objeto válido
                setCurrentUser(user);
                localStorage.setItem('user', JSON.stringify(user)); // Guarda como JSON
            } else {
                console.error('Respuesta inesperada:', response.data);
                throw new Error('Respuesta de inicio de sesión no válida');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    };
    

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('user');
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        console.log('Contenido de localStorage:', user); // Verifica el contenido

        if (user) {
            try {
                setCurrentUser(JSON.parse(user));
            } catch (error) {
                console.error('Error al parsear el usuario:', error);
            }
        } else {
            console.log('No hay usuario guardado en localStorage');
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
