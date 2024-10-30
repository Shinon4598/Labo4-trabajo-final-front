// src/views/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Idea Generator</h1>
            <p>Generate, view, and track project ideas easily.</p>
            <nav>
                <Link to="/idea-generator">Generate New Idea</Link> | 
                <Link to="/ideas">View Ideas</Link> | 
                <Link to="/history">Idea History</Link>
            </nav>
        </div>
    );
};

export default Home;
