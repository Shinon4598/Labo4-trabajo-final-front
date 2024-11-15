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
    const [favorites, setFavorites] = useState([]);

    const addFavorite = async (ideaId) => {
        try {
          const response = await axios.post(
            `http://localhost:3001/api/favorites`,
            { userId: currentUser.userId, ideaId },
            {
              headers: { Authorization: `Bearer ${currentUser.token}` },
            }
          );
          if (response.status === 201) {
            setFavorites((prevFavorites) => [...prevFavorites, ideaId]);
          }
        } catch (err) {
          console.error('Error añadiendo a favoritos:', err);
        }
      };
    
      // Función para eliminar un favorito
      const removeFavorite = async (ideaId) => {
        try {
          const response = await axios.delete(
            `http://localhost:3001/api/favorites/${currentUser.userId}/${ideaId}`,
            {
              headers: { Authorization: `Bearer ${currentUser.token}` },
            }
          );
          if (response.status === 204) {
            setFavorites((prevFavorites) =>
              prevFavorites.filter((favId) => favId !== ideaId)
            );
          }
        } catch (err) {
          console.error('Error eliminando de favoritos:', err);
        }
      };
    
      // Función para manejar el clic en favorito
      const handleFavorite = (ideaId) => {
        if (favorites.includes(ideaId)) {
          removeFavorite(ideaId);
        } else {
          addFavorite(ideaId);
        }
      };

    useEffect(() => {
        const fetchIdeas = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/favorites/${currentUser.userId}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                });
                setIdeas(response.data);
                setFavorites(response.data.map((idea) => idea.ideaId));
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

    if(loading) {
        return <Loader fullScreen={true} />;
    }

    return (
        <>
            <NavBar>
                <a href='/history'>Historial</a>
                <a href="/profile">Perfil</a>
                <a href="/idea-generator">Generador idea</a>
            </NavBar>
            <main className="mx-15">
                <h1 className="text-3xl font-bold my-2 text-indigo-950 text-center mt-8">Ideas Favoritas</h1>

                {ideas.length > 0 ? (
                    <div className="lg:mx-16 grid lg:grid-cols-2 gap-4">
                        {ideas.map((idea) => (
                            <Card
                                key={idea.ideaId}
                                idea={idea.description}
                                ideaId={idea.ideaId}
                                isLiked={idea.isLiked}
                                createdAt={idea.generationDate}
                                handleFavorite={handleFavorite}
                                isFavorite={favorites.includes(idea.ideaId)}
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
