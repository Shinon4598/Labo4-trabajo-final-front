import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import Loader from '../../components/Loader';
import NavBar from '../../components/Nav-bar';
import Card from '../../components/Card';

const IdeaHistory = () => {
  const [ideas, setIdeas] = useState([]);
  const [favorites, setFavorites] = useState([]); // Almacena los favoritos del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Navegación al detalle de la idea
  const handleNavigateDetail = (ideaId) => {
    navigate(`/idea-detail/${ideaId}`);
  };

  // Función para añadir un favorito
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

  // Obtener favoritos e ideas
  useEffect(() => {
    const fetchFavoritesAndIdeas = async () => {
      setLoading(true);
      try {
        // Llamadas en paralelo
        const [favoritesResponse, ideasResponse] = await Promise.all([
          axios.get(`http://localhost:3001/api/favorites/${currentUser.userId}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }),
          axios.get(`http://localhost:3001/api/idea-history/${currentUser.userId}`, {
            headers: { Authorization: `Bearer ${currentUser.token}` },
          }),
        ]);

        setFavorites(favoritesResponse.data.map((fav) => fav.ideaId));
        setIdeas(ideasResponse.data);
      } catch (err) {
        console.error('Error obteniendo datos:', err);
        setError('Error obteniendo los datos. Intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesAndIdeas();
  }, [currentUser.userId, currentUser.token]);

  const handleRedirect = () => {
    navigate('/profile');
  };

  return (
    <>
      <NavBar>
        <a href="/history">Guardado</a>
        <a href="/profile">Perfil</a>
      </NavBar>
      <h2 className="text-3xl font-bold my-2 text-[#1e0e4b] text-center mt-8">Historial de Ideas</h2>
      {error ? (
        <p className="idea-history__error-message">{error}</p>
      ) : loading ? (
        <Loader />
      ) : (
        <div className="mx-16 grid lg:grid-cols-2 gap-4">
          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <Card
                key={idea.ideaId}
                idea={idea.ideaDescription}
                ideaId={idea.ideaId}
                userId={currentUser.userId}
                createdAt={idea.queryDate}
                handleNavigateDetail={handleNavigateDetail}
                handleFavorite={() => handleFavorite(idea.ideaId)}
                isLiked={favorites.includes(idea.ideaId)} // Comprobamos si está en favoritos
              />
            ))
          ) : (
            <p className="idea-history__no-ideas">No hay ideas disponibles.</p>
          )}
        </div>
      )}
      <button className="idea-history__profile-button" onClick={handleRedirect}>Ir a Perfil</button>
    </>
  );
};

export default IdeaHistory;
