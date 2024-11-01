// src/views/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import './Home.css';
import Button from '../../components/Button';

const Home = () => {
    return (
        <>
        
            <NavBar>
                <a href="/">Inicio</a>
                <a href="/">Guardado</a>
                <a href="/">Crear</a>
            </NavBar>
            <main className='container'>
                <div className="banner">
                    <div className="text-banner">
                        <h1>Generador de ideas</h1>
                        <p>Crear ideas nuevas e innovadoras utilizando el poder de la IA</p>
                        <Button type="button" className="no-expand">Generar Idea</Button>
                    </div>
                </div>
            <nav>
                <Link to="/idea-generator">Generate New Idea</Link> | 
                <Link to="/ideas">View Ideas</Link> | 
                <Link to="/history">Idea History</Link>
            </nav>
            </main>
            
        </>
    );
};

export default Home;
