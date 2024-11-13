import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import './IdeaFavorites.css';

export default function IdeaFavorites() {
    const [ideas, setIdeas] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/favorites/${currentUser.userId}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
                setIdeas(response.data);
            } catch (error) {
                console.error('Error al cargar las ideas:', error);
            }
        };

        if (currentUser?.token) {
            fetchIdeas();
        }
    }, [currentUser]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Fecha no disponible';
        return new Date(dateString).toLocaleDateString('es-ES', {
            dateStyle: 'medium'
        });
    };

    return (
        <div className="idea-favorites-container">
            <h1 className="idea-favorites-title">Ideas Favoritas</h1>
            {ideas.length > 0 ? (
                <div className="idea-grid">
                    {ideas.map((idea) => (
                        <div key={idea.ideaId} className="idea-card">
                            <p className="idea-card-description">{idea.description ?? 'Descripción no disponible'}</p>

                            {idea.recommendedTechnologies && (
                                <div className="idea-technologies">
                                    <strong>Tecnologías Recomendadas:</strong>
                                    <p dangerouslySetInnerHTML={{ __html: idea.recommendedTechnologies.replace(/\n/g, '<br/>') }} />
                                </div>
                            )}

                            {idea.designPatterns && (
                                <p className="idea-card-design-patterns">
                                    <strong>Patrones de Diseño:</strong> {idea.designPatterns}
                                </p>
                            )}

                            {idea.additionalFeatures && (
                                <div className="idea-additional-features">
                                    <strong>Características Adicionales:</strong>
                                    <p>{idea.additionalFeatures}</p>
                                </div>
                            )}

                            {idea.knowledgeLevel && (
                                <p className="idea-card-knowledge-level">
                                    <strong>Nivel de Conocimiento:</strong> {idea.knowledgeLevel}
                                </p>
                            )}

                            <small className="idea-card-date">Creado el: {formatDate(idea.generationDate)}</small>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-favorites">No tienes ideas favoritas.</p>
            )}
        </div>
    );
}
