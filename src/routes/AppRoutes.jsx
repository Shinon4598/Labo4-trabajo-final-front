// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Asegúrate de que el hook esté bien implementado
import Home from '../views/Home';
import IdeaGeneratorForm from '../components/IdeaGeneratorForm';
import IdeaHistory from '../components/IdeaHistory';
import Login from '../components/Login';

const AppRoutes = () => {
    const { currentUser } = useAuth();

    return (
        <Routes>
            <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route 
                path="/idea-generator" 
                element={currentUser ? <IdeaGeneratorForm /> : <Navigate to="/login" />} 
            />
            <Route 
                path="/history" 
                element={currentUser ? <IdeaHistory /> : <Navigate to="/login" />} 
            />
        </Routes>
    );
};

export default AppRoutes;
