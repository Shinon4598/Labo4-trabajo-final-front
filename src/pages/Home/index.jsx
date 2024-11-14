import NavBar from "../../components/Nav-bar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";


const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="prueba">
      <NavBar>
        <a href="/history">Historial</a>
        <a href={`/favorites/${currentUser.userId}`}>Favoritos</a>
        <a href="/profile">Perfil</a>
      </NavBar>
      <main className="container">
        <div className="element"></div>

        <div className="banner">
          <div className="text-banner">
            <p>Crear ideas nuevas e innovadoras utilizando el poder de la IA</p>
            <button
              className="no-expand"
              onClick={() => handleNavigate("/idea-generator")} // Cambié aquí para pasar la función correctamente
            >
              Generar Idea
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;