import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Register = () => {
    const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        try {
            const {email, password} = user;
            await axios.post('http://localhost:3001/api/auth/register', {email, password});
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
                        name='email'
                        value={user.email} 
                        onChange={handleChange} 
                        placeholder="email"
                        required={true}
                    /> 
                    <Input
                        label="password"
                        type="password"
                        name='password'
                        value={user.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required={true}
                    />
                    <Input
                        label="Confirmar contraseña"
                        type="password"
                        value={user.confirmPassword}
                        name='confirmPassword'
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        required={true}
                    />
                    {error && <p>{error}</p>}
                    <div className="text-center">
                        <Button type="submit">Registrate</Button>
                        <a href="/login">Ya tienes un usuario?</a>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Register;
