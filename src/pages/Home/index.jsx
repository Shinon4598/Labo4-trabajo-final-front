// src/views/Home.jsx
import React from 'react';
import NavBar from '../../components/Navbar';
import './Home.css';
import Button from '../../components/Button';
import IdeaHistory from '../IdeaHistory';

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
                        <Button type="link" to='/idea-generator' className="no-expand">Generar Idea</Button>
                    </div>
                </div>
                <IdeaHistory />
            </main>
            
        </>
    );
};

export default Home;
