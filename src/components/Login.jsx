// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Importa el hook
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
    const { login } = useAuth(); // Usa el hook para obtener la función de login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Inicializa el hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reinicia el error al intentar iniciar sesión
        try {
            await login(email, password);
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Error de inicio de sesión'); // Mensaje más específico
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
            />
            <button type="submit">Iniciar sesión</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;
