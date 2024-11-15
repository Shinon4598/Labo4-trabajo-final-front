import { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../components/Loader";
import Card from "../../components/Card";
import NavBar from "../../components/Nav-bar";

export default function IdeaFavorites() {
    const [ideas, setIdeas] = useState([]);
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const {id} = useAuth();

    
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
        <>
            <NavBar>
                <a href={`/history/${currentUser.userId}`}>Historial</a>
                <a href="/profile">Perfil</a>
                <a href="/idea-generator">Generador idea</a>
            </NavBar>
            <main className="mx-15">
                <h1 className="text-3xl font-bold my-2 text-indigo-950 text-center mt-8">Ideas Favoritas</h1>
                {loading && <Loader fullScreen={true}/>}

                {ideas.length > 0 ? (
                    <div className="lg:mx-16 grid lg:grid-cols-2 gap-4">
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
            </main>
        </>
        
    );
}
