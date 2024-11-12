import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar'; 
import Input from '../../components/Input'; 
import Button from '../../components/Button';
import './Login.css';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error de inicio de sesión');
        }
    };
    
    return (
        <>
            <Navbar />
            <main className="login-container">
                <div className="login-card">
                    <h2 className="login-title">Bienvenido de Nuevo</h2>
                    <p className="login-subtitle">Por favor, ingresa tus datos para continuar</p>
                    <form onSubmit={handleSubmit} className="login-form">
                        <Input 
                            label="Correo electrónico: " 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="correo@ejemplo.com"
                            required={true}
                        /> 
                        <Input
                            label="Contraseña: "
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required={true}
                        />
                        {error && <p className="login-error">{error}</p>}
                        <Button type="submit" className="login-button">Iniciar Sesión</Button>
                    </form>
                    <a href="/register" className="login-register-link">¿No tienes una cuenta? Regístrate aquí</a>
                </div>
            </main>
        </>
    );
};

export default Login;
