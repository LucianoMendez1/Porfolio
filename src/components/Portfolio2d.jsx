
import './portfolio2d.css';
/* import LegendaryCursor from "legendary-cursor";
window.addEventListener("load", () => {

    LegendaryCursor.init({
        lineSize:         0.10,
        opacityDecrement: 0.55,
        speedExpFactor:   0.8,
        lineExpFactor:    0.6,
        sparklesCount:    65,
        maxOpacity:       0.99,  // should be a number between [0 ... 1]
        // texture1:         "http://path_to_texture",      // texture displayed on mouse hover
        // texture2:         "http://path_to_texture",      // texture displayed on mouse click
        // texture3:         "http://path_to_texture",      // texture displayed on sparkles
    });

}); */
const Portfolio2d = () => {
  return (
    
    <div className="portfolio2d">
      <header className="portfolio-header">
        <h1>Portafolio </h1>
      </header>
      <main className="portfolio-main">
        {/* Aquí puedes agregar tus proyectos con animaciones */}
        <div className="project">
          <h2>Proyecto 1</h2>
          {/* Agrega aquí contenido y animaciones */}
        </div>
        <div className="project">
          <h2>Proyecto 2</h2>
          {/* Agrega aquí contenido y animaciones */}
        </div>
        {/* Agrega más proyectos según sea necesario */}
      </main>
      <footer className="portfolio-footer">
        <p>&copy; 2023 Luciano Mendez</p>
      </footer>
    </div>
  );
}

export default Portfolio2d;
