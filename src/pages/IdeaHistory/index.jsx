import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import Loader from '../../components/Loader';
import NavBar from '../../components/Nav-bar';
import Card from '../../components/Card';

const IdeaHistory = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleNavigateDetail = (ideaId) => {
    navigate(`/idea-detail/${ideaId}`);
  };

  const handleFavorite = async (userId, ideaId, isLiked) => {
    try {
      let response;
  
      if (isLiked) {
        response = await axios.delete(
          `http://localhost:3001/api/favorites/${userId}/${ideaId}`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:3001/api/favorites`,
          {
            userId,
            ideaId,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
      }
  
  
      if (response.status === 201 || response.status === 204) { 
        
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.ideaId === ideaId
              ? { ...idea, isLiked: !isLiked } 
              : idea
          )
        );
      } else {
        alert('Hubo un error al procesar la solicitud de Me gusta.');
      }
    } catch (err) {
      console.error('Error al actualizar el favorito:', err);
    }
  };

  useEffect(() => {
    const fetchIdeaHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.userId || !user.token) {
          setError('Usuario no autenticado. Por favor, inicie sesión.');
          setLoading(false);
          return;
        }

        const headers = {
          Authorization: `Bearer ${user.token}`,
        };

        const response = await axios.get(
          `http://localhost:3001/api/idea-history/${user.userId}`,
          { headers }
        );

        console.log('Datos recibidos de la API:', response.data);

        if (Array.isArray(response.data)) {
          setIdeas(response.data.map(idea => ({
            ...idea,
            isLiked: idea.isLiked || false,  // Agregamos la propiedad "isLiked"
          })));
        } else {
          console.warn('La respuesta de la API no es un array');
          setIdeas([]);
        }
      } catch (err) {
        console.error('Error obteniendo el historial de ideas:', err);

        if (err.response?.status === 401) {
          setError('Error de autenticación. Por favor, inicie sesión.');
        } else {
          setError('Error obteniendo el historial de ideas.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIdeaHistory();
  }, []);

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
        <Loader/>
      ) : (
        <div className="mx-16 grid grid-cols-2 gap-4">
          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <Card
                key={idea.historyId}
                idea={idea.ideaDescription}
                ideaId={idea.ideaId}
                isLiked={idea.isLiked}
                ideaDescription={idea.ideaDescription}
                createdAt={idea.queryDate}
                theme={idea.parameterTheme}
                handleNavigateDetail={handleNavigateDetail}
                handleFavorite={handleFavorite}
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
