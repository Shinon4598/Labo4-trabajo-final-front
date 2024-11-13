import NavBar from "../../components/Nav-bar";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="prueba">
      <NavBar>
        <a href="/history">Guardado</a>
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