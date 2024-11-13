import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IdeaHistory.css';
import { useAuth } from "../../contexts/AuthContext";

const IdeaHistory = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const handleNavigateDetail = (ideaId) => {
    navigate(`/idea-detail/${ideaId}`);
  };

  const handleAddFavorite = async (userId, ideaId, isLiked) => {
    try {
      const response = await axios.post(
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

      if (response.status === 201) {  // Revisamos si el estado es 201 (creado)
        // Actualizar el estado de "Me gusta" para la idea correspondiente
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
      console.error('Error al actualizar el favorito:', err);
      alert('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
    }
  };

  const handleDeleteFavorite = async (userId, ideaId, isLiked) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/favorites/${userId}/${ideaId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      // Verificar si la respuesta fue exitosa
      if (response.status === 200) {
        // Actualizar el estado de "Me gusta" para la idea correspondiente
        setIdeas((prevIdeas) =>
          prevIdeas.map((idea) =>
            idea.ideaId === ideaId
              ? { ...idea, isLiked: !isLiked } // Cambiar el estado de "Me gusta"
              : idea
          )
        );
      } else {
        alert('Hubo un error al eliminar el favorito.');
      }
    } catch (err) {
      console.error('Error al eliminar el favorito:', err);
      alert('Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (date.getTime()) {
      return 'Fecha inválida';
    }
    return date.toLocaleDateString();
  };

  const handleRedirect = () => {
    navigate('/profile');
  };


  return (
    <div className="idea-history">
      <h2 className="idea-history__title">Historial de Ideas</h2>
      {error ? (
        <p className="idea-history__error-message">{error}</p>
      ) : loading ? (
        <Loader/>
      ) : (
        <div className="idea-history__cards">
          {ideas.length > 0 ? (
            ideas.map((idea) => (
              <div key={idea.historyId} className="idea-card">
                <h3 className="idea-card__title">{idea.ideaDescription}</h3>
                <p className="idea-card__parameter">{idea.parameterId}</p>
                <small className="idea-card__date">Creado en: {formatDate(idea.createdAt)}</small>
                <p className="idea-card__description">{idea.ideaDescription}</p>
                <p className="idea-card__technologies">Tecnologías recomendadas: {idea.ideaRecommendedTechnologies}</p>
                <p className="idea-card__patterns">Patrones de diseño: {idea.ideaDesignPatterns}</p>
                <p className="idea-card__additional-features">Características adicionales: {idea.ideaAdditionalFeatures}</p>
                <p className="idea-card__level">Nivel de conocimiento: {idea.ideaKnowledgeLevel}</p>
                <p className="idea-card__generation-date">Fecha de generación: {formatDate(idea.ideaGenerationDate)}</p>
                <p className="idea-card__theme">Tema: {idea.parameterTheme}</p>
                <p className="idea-card__preferred-technologies">Tecnologías preferidas: {idea.parameterTechnologies}</p>
                <p className="idea-card__preferred-patterns">Patrones preferidos: {idea.parameterPreferredDesignPatterns}</p>
                <p className="idea-card__parameter-description">{idea.parameterDescription}</p>
                <div className="idea-card__actions">
                  <button
                    className="idea-card__like-button"
                    onClick={() =>
                      idea.isLiked
                        ? handleDeleteFavorite(currentUser.userId, idea.ideaId, idea.isLiked)
                        : handleAddFavorite(currentUser.userId, idea.ideaId, idea.isLiked)
                    }
                  >
                    {idea.isLiked ? "Quitar me gusta" : "Me gusta"}
                  </button>
                  <button
                    className="idea-card__detail-button"
                    onClick={() => handleNavigateDetail(idea.ideaId)}
                  >
                    DETALLES
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="idea-history__no-ideas">No hay ideas disponibles.</p>
          )}
        </div>
      )}
      <button className="idea-history__profile-button" onClick={handleRedirect}>Ir a Perfil</button>
    </div>
  );
};  

export default IdeaHistory;
