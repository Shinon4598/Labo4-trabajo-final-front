// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Importa el hook
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Navbar from '../../components/NavBar/Navbar'; 
import Input from '../../components/Inputs/Input'; 
import './Login.css';
import Button from '../../components/Buttons/Button-clasic/Button';

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
        <>
        <Navbar/>
        <main className='login-container'>
            <h3 className='text-center'>Iniciar sesión</h3>
            <form onSubmit={handleSubmit}>
                <Input 
                    label = "email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="email"
                    required={true}
                /> 
                <Input
                    label="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required={true}
                />
                {error && <p>{error}</p>}
                <div className="text-center">
                    <Button type="submit">Iniciar Sesión</Button>
                </div>
                <a href="/register">No tienes un usuario?</a>
                <Button type="button" className="secondary">Registrate</Button>

            </form>


        </main>
        
        </>
    );
};

export default Login;
