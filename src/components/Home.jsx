import { useState, useEffect } from "react";
import "./Home.css"; // Importa el archivo CSS
import SceneComponent from "./Scene"; // Importa el componente SceneComponent

const Home = () => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [showPreload, setShowPreload] = useState(true);

  const handleLinkMouseEnter = () => {
    setIsHoveringLink(true);
  };

  const handleLinkMouseLeave = () => {
    setIsHoveringLink(false);
  };

  // Esta función ocultará el preload después de 5 segundos
  useEffect(() => {
    const preloadTimeout = setTimeout(() => {
      setShowPreload(false);
    }, 5000); // 5000 milisegundos = 5 segundos

    // Limpia el temporizador si el usuario hace clic en el preload antes de que desaparezca
    return () => {
      clearTimeout(preloadTimeout);
    };
  }, []);

  // Función para ocultar el preload cuando se hace clic en él
  const handlePreloadClick = () => {
    setShowPreload(false);
  };

  return (
    <div className="home">
      <SceneComponent />

      <div className={`home-content ${showPreload ? "hidden" : ""}`}>
        <h1
          className={`home-title ${
            isHoveringLink ? "custom-cursor-example" : ""
          }`}
          onMouseEnter={handleLinkMouseEnter}
          onMouseLeave={handleLinkMouseLeave}
        >
          Bienvenido a mi Portfolio 3D
        </h1>
        {showPreload && (
          <div
            className={`preload-overlay ${
              isHoveringLink ? "custom-cursor-example" : ""
            }`}
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
            onClick={handlePreloadClick}
          >
            <div className="preload-content">
              <div className="titulo">Bienvenido a mi Portafolio 3d</div>
              <div className="descripcion">
                
                Para moverte en la escena utiliza las teclas AWSD 
              </div>
              <div className="click">Apreta el click para comenzar</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
