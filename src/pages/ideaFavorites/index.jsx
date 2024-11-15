import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../components/Loader";
import Card from "../../components/Card";

export default function IdeaFavorites() {
    const [ideas, setIdeas] = useState([]);
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/favorites/${currentUser.userId}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
                setIdeas(response.data);
        console.log('Datos recibidos de la API:', response.data);

            } catch (error) {
                console.error('Error al cargar las ideas:', error);
            }
            finally {
                setLoading(false);
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
        <div className="mx-15">
            <h1 className="text-indigo-950 font-bold text-2xl">Ideas Favoritas</h1>
            {loading && <Loader fullScreen={true}/>}

            {ideas.length > 0 ? (
                <div className="grid lg:grid-cols-2 gap-4">
                    {ideas.map((idea) => (
                        <Card
                        key={idea.historyId}
                        idea={idea.description}
                        ideaId={idea.ideaId}
                        isLiked={idea.isLiked}
                        createdAt={idea.generationDate}
                      />
                    ))}
                </div>
            ) : (
                <p className="no-favorites">No tienes ideas favoritas.</p>
            )}
        </div>
    );
}
