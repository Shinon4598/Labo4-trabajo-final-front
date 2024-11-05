// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Asegúrate de que el hook esté bien implementado
import Home from '../pages/Home';
import IdeaGeneratorForm from '../pages/IdeaGeneratorForm';
import IdeaHistory from '../pages/IdeaHistory';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AppRoutes = () => {
  const { currentUser } = useAuth();
    return (
        <Routes>
            <Route path="/" element={currentUser? <Home />: <Navigate to="/login"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
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
