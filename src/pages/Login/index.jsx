// src/components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Nav-bar'; 
import Input from '../../components/Input'; 
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import ErrorMessage from '../../components/Error-message';


const Login = () => {
    const { login } = useAuth(); // Usa el hook para obtener la función de login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Error de inicio de sesión'); // Mensaje más específico
        }
        finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-screen w-screen">
            <Navbar />
            <main className="flex justify-center mx-auto my-14 shadow-none ">
                <div className="w-full sm:w-96 lg:w-1/3 flex flex-col p-4 rounded-md text-black bg-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Bienvenido de Nuevo</h2>
                    <p className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Por favor, ingresa tus datos para continuar</p>
                    <form onSubmit={handleSubmit}>
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
                        {error && <ErrorMessage message={error}></ErrorMessage> }
                        {loading && <Loader></Loader>}
                        <Button type="submit">Iniciar Sesión</Button>
                    </form>
                    <Link to="/register" className="text-sm text-center mt-[1.6rem]">¿No tienes una cuenta? <span className="text-sm text-[#7747ff]">Regístrate aquí</span> </Link>
                </div>
            </main>
        </div>
    );
};

export default Login;
