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

    const handleFavorite = async (ideaId, userId) => {
      try {
        let response;
        console.log(currentUser)
  
        if (favorites.includes(ideaId)) {
          // Eliminar de favoritos
          response = await axios.delete(
            `http://localhost:3001/api/favorites/${currentUser.userId}/${ideaId}`,
            {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );
        } else {
          // Añadir a favoritos
          response = await axios.post(
            `http://localhost:3001/api/favorites`,
            {
              userId: currentUser.userId,
              ideaId,
            },
            {
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );
        }
        if (response.status === 201 || response.status === 200) {
          // Actualizar el estado del favorito en la UI
          if (favorites.includes(ideaId)) {
            setFavorites(favorites.filter((favId) => favId !== ideaId));
          } else {
            setFavorites([...favorites, ideaId]);
          }
        } else {
          alert('Hubo un error al procesar la solicitud de Me gusta.');
        }
      } catch (err) {
        console.error('Error al actualizar el favorito:', err);
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
