import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register = () => {
    const [user, setUser] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/auth/register', user);
            navigate('/login'); // Redirige al login después de registrarse
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    return (
        <>
            <Navbar/>
            <main className='login-container'>
                <h3 className='text-center'>Registro</h3>
                <form onSubmit={handleSubmit}>
                    <Input 
                        label = "email" 
                        type="email" 
                        value={user.email} 
                        onChange={handleChange} 
                        placeholder="email"
                        required={true}
                    /> 
                    <Input
                        label="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required={true}
                    />
                    {error && <p>{error}</p>}
                    <div className="text-center">
                        <Button type="submit">Registrate</Button>
                        <a href="/login">Ya tienes un usuario?</a>
                        <Button type="link" to='/login' className="secondary">Inicia Sesión</Button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Register;
