import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ email: '', password: '' });
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
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Correo Electrónico:
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">Registrarse</button>
                <p>Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a></p>
            </form>
        </div>
    );
};

export default Register;
