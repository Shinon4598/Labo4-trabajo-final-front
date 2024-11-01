// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Importa el hook
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import Navbar from '../../components/NavBar/Navbar'; 
import Input from '../../components/Inputs/Input'; 
import './Login.css';
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
        <main className='container p-5 d-flex flex-column'>
            <h3 className='text-center'>Iniciar sesión</h3>
            <form onSubmit={handleSubmit}>
                <Input 
                    label = "email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder={email} 
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

                <div className="text-center mt-3">
                    <a href="/forgot-password">Olvidé mi contraseña</a>
                </div>
                <div className="text-center">
                    <button type="submit" class="btn btn-primary w-50 m-auto mt-3">Iniciar sesión</button>
                </div>
            </form>
            <button  type="submit" class="btn btn-secondary w-50 m-auto mt-3">Registrate</button>

        </main>
        
        </>
    );
};

export default Login;
