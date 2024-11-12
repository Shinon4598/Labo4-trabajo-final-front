import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './Register.css';

const Register = () => {
    const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Limpiar los campos al cargar el componente
    useEffect(() => {
        setUser({ email: '', password: '', confirmPassword: '' });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de la contraseña
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (user.password !== user.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (!passwordPattern.test(user.password)) {
            setError('La contraseña debe tener al menos una letra minúscula, una mayúscula, un número, un símbolo y no debe contener espacios.');
            return;
        }

        try {
            const { email, password } = user;
            await axios.post('http://localhost:3001/api/users', { email, password });
            // Limpiar los campos después de un registro exitoso
            setUser({ email: '', password: '', confirmPassword: '' });
            navigate('/login'); // Redirige al login después de registrarse
        } catch (error) {
            console.error('Error al registrarse:', error);
            setError('Hubo un error al registrar el usuario.');
        }
    };

    return (
        <>
            <Navbar />
            <main className="register-container">
                <div className="register-card">
                    <h2 className="register-title">Crea tu cuenta</h2>
                    <p className="register-subtitle">Ingresa tus datos para registrarte</p>
                    <form onSubmit={handleSubmit} className="register-form">
                        <Input 
                            label="Correo electrónico: " 
                            type="email" 
                            name='email'
                            value={user.email} 
                            onChange={handleChange} 
                            placeholder="correo@ejemplo.com"
                            required={true}
                            autoComplete="off"
                        /> 
                        <Input
                            label="Contraseña: "
                            type="password"
                            name='password'
                            value={user.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required={true}
                            autoComplete="off"
                        />
                        <Input
                            label="Confirmar contraseña: "
                            type="password"
                            name='confirmPassword'
                            value={user.confirmPassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required={true}
                            autoComplete="off"
                        />
                        {error && <p className="register-error">{error}</p>}
                        <Button type="submit" className="register-button">Registrarme</Button>
                    </form>
                    <a href="/login" className="register-login-link">¿Ya tienes una cuenta? Inicia sesión aquí</a>
                </div>
            </main>
        </>
    );
};

export default Register;
