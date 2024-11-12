import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import './IdeaDetail.css';

export default function IdeaDetail() {
    const { id } = useParams();  // Obtenemos el ID de la URL
    const [idea, setIdea] = useState(null);  // Usamos null en lugar de un objeto vacío
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchIdea = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/idea-history/idea/${id}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
                // Verificar si la respuesta es un array y tomar el primer elemento
                const fetchedIdea = Array.isArray(response.data) ? response.data[0] : response.data;
                setIdea(fetchedIdea);
            } catch (error) {
                console.error('Error al cargar la idea:', error);
                setError('No se pudo cargar la idea. Intenta nuevamente más tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchIdea();
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!idea) {
        return <p className="idea-detail__not-found">La idea no fue encontrada.</p>;
    }

    console.log('idea:', idea);

    return (
        <div className="idea-detail">
            <h1 className="idea-detail__title">Detalle de la Idea</h1>
            <div className="idea-detail__content">
                <section className="idea-detail__section">
                    <h2 className="idea-detail__subtitle">Idea General</h2>
                    <p><strong>ID de la Idea:</strong> {idea.ideaId}</p>
                    <p><strong>Descripción:</strong> {idea.ideaDescription}</p>
                    <p><strong>Tecnologías Recomendadas:</strong> {idea.ideaRecommendedTechnologies}</p>
                    <p><strong>Patrones de Diseño:</strong> {idea.ideaDesignPatterns}</p>
                </section>

                <section className="idea-detail__section">
                    <h2 className="idea-detail__subtitle">Detalles del Usuario</h2>
                    <p><strong>Usuario:</strong> {idea.userEmail}</p>
                    <p><strong>ID de Usuario:</strong> {idea.userId}</p>
                </section>

                <section className="idea-detail__section">
                    <h2 className="idea-detail__subtitle">Parámetros</h2>
                    <p><strong>Tema:</strong> {idea.parameterTheme}</p>
                    <p><strong>Tecnologías Preferidas:</strong> {idea.parameterTechnologies}</p>
                    <p><strong>Nivel de Conocimiento:</strong> {idea.parameterKnowledgeLevel}</p>
                    <p><strong>Patrones de Diseño Preferidos:</strong> {idea.parameterPreferredDesignPatterns}</p>
                </section>

                <section className="idea-detail__section">
                    <h2 className="idea-detail__subtitle">Fechas</h2>
                    <p><strong>Fecha de Consulta:</strong> {new Date(idea.queryDate).toLocaleDateString()}</p>
                    <p><strong>Fecha de Generación:</strong> {new Date(idea.ideaGenerationDate).toLocaleDateString()}</p>
                </section>
            </div>
        </div>
    );
}