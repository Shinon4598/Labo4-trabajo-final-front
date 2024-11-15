import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Home from '../pages/Home';
import IdeaGeneratorForm from '../pages/IdeaGeneratorForm';
import IdeaHistory from '../pages/IdeaHistory';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/profile';
import IdeaDetail from '../pages/ideaDetail';
import IdeaFavorites from '../pages/IdeaFavorites';

const AppRoutes = () => {
    const { currentUser } = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={
                    currentUser && currentUser.userId ? (
                        <Home />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/idea-generator"
                element={
                    currentUser && currentUser.userId ? (
                        <IdeaGeneratorForm />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/history/:id"
                element={
                    currentUser && currentUser.userId ? (
                        <IdeaHistory />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/favorites/:id"
                element={
                    currentUser && currentUser.userId ? (
                        <IdeaFavorites />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route 
                path="/idea-detail/:id"
                element={
                    currentUser && currentUser.userId ? (
                        <IdeaDetail />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/profile"
                element={
                    currentUser && currentUser.userId ? (
                        <Profile />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            
        </Routes>
    );
};

export default AppRoutes;
