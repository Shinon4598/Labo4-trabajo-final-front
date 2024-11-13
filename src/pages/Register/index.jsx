import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Nav-bar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorMessage from '../../components/Error-message';

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
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-screen w-screen">
            <Navbar />
            <main className="flex justify-center mx-auto my-14 shadow-none">
                <div className="w-full sm:w-96 lg:w-1/3 flex flex-col p-4 rounded-md text-black bg-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Crea tu cuenta</h2>
                    <p className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Ingresa tus datos para registrarte</p>
                    <form onSubmit={handleSubmit}>
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
                        {error && <ErrorMessage message={error}></ErrorMessage> }
                        <Button type="submit" className="register-button">Registrarme</Button>
                    </form>
                    <Link to="/login" className="text-sm text-center mt-[1.6rem]">¿Ya tienes una cuenta? <span className="text-sm text-[#7747ff]">Inicia sesión aquí</span> </Link>
                </div>
            </main>
        </div>
    );
};

export default Register;
