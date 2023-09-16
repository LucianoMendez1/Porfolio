import React, { Component } from 'react';
import './pc.css';
import windowsLogo from './img/logo-windows-13475.png';
import powerIcon from './img/pngwing.com.png';
import browserIcon from './img/hongopng.png';
import textEditorIcon from './img/artpalm.png';
import icoCalistenics from './img/silueta.jpg';
import psychelic from './img/hongo1.png';
import galaxy from './img/galaxia.png';
import backgroundGif from './img/retro-city.gif'; // Ruta al archivo GIF
import gsap from 'gsap';
import appIcon1 from './img/artpalm.png';
import appIcon2 from './img/carpeta.png';

class PC extends Component {
  constructor() {
    super();
    this.state = {
      powerOn: false,
      loadingComplete: false,
      executables: [
        { name: 'Calisthenics.exe', url: 'https://lucianomendez1.github.io/Calisthenics./', isOpen: false, icon: icoCalistenics },
        { name: 'Psychedelic2.0.exe', url: 'https://psychedelic2-0.vercel.app/', isOpen: false, icon: browserIcon },
        { name: 'Art Palm.exe', url: 'https://psychedelic2-0.vercel.app/', isOpen: false, icon: textEditorIcon },
        { name: 'Psychedelic1.0', url: 'https://lucianomendez1.github.io/Psychodelic/', isOpen: false, icon: psychelic },
        { name: 'Galaxy', url: 'https://galaxy-wheat.vercel.app/', isOpen: false, icon: galaxy },
      ],
      openWindows: [],
      searchQuery: '', // Nuevo estado para la barra de búsqueda
    };
    this.pcStartupRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.state.powerOn) {
        this.startupAnimation();
        setTimeout(() => {
          this.loadingCompleteAnimation();
        }, 2000);
      }
    }, 2000);
  }

  togglePowerOn = () => {
    this.setState({ powerOn: true }, () => {
      this.startupAnimation();
    });
  };

  togglePowerOff = () => {
    this.setState({ powerOn: false, loadingComplete: false });
  };

  startupAnimation = () => {
    gsap.fromTo(
      this.pcStartupRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: 'power4.out' }
    );
  };

  loadingCompleteAnimation = () => {
    gsap.fromTo(
      '.background',
      { opacity: 0, backgroundImage: `url(${backgroundGif})` }, // Usa el archivo GIF como fondo
      { opacity: 1, duration: 0.1, ease: 'power4.out', onComplete: () => {
        this.setState({ loadingComplete: true });
        gsap.to(this.pcStartupRef.current, { opacity: 0, duration: 0.1 });
      }}
    );
  };

  openUrl = (url) => {
    window.open(url, '_blank');
  };

  toggleExecutable = (index) => {
    const updatedExecutables = [...this.state.executables];
    const executable = updatedExecutables[index];

    if (!executable.isOpen) {
      // Si se abre el ejecutable, agregamos una nueva ventana emergente
      const newWindow = (
        <div className="popup-window" key={index}>
          <div className="popup-header">
            <div className="popup-title">
              <img src={executable.icon} alt={executable.name} className="executable-icon" />
              {executable.name}
            </div>
            <div className="popup-close" onClick={() => this.closeWindow(index)}>
              X
            </div>
          </div>
          <iframe src={executable.url} className="popup-content" />
        </div>
      );

      const openWindows = [...this.state.openWindows];
      openWindows.push(newWindow);

      executable.isOpen = true;
      this.setState({ executables: updatedExecutables, openWindows });
    } else {
      // Si se cierra el ejecutable, eliminamos la ventana emergente
      this.closeWindow(index);
    }
  };

  closeWindow = (index) => {
    const updatedExecutables = [...this.state.executables];
    updatedExecutables[index].isOpen = false;

    const openWindows = [...this.state.openWindows];
    openWindows.splice(index, 1);

    this.setState({ executables: updatedExecutables, openWindows });
  };

  // Método para manejar cambios en la barra de búsqueda
  handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <div className={`pc ${this.state.powerOn ? 'power-on' : ''}`}>
        <div className="background"></div>

        {!this.state.powerOn && (
          <button className="power-on-button" onClick={this.togglePowerOn}>
            <img className="power-icon" src={powerIcon} alt="Power Icon" />
          </button>
        )}

        {this.state.powerOn && (
          <div className="power-off-button-container">
            <button className="power-off-button" onClick={this.togglePowerOff}>
              Apagar
            </button>
          </div>
        )}

        {this.state.powerOn && !this.state.loadingComplete && (
          <div className="power-off-message">
            {/* Agrega contenido para la pantalla de apagado si es necesario */}
          </div>
        )}

        <div
          className={`pc-startup ${this.state.powerOn ? 'active' : ''}`}
          ref={this.pcStartupRef}
        >
          {!this.state.loadingComplete && (
            <div className="loading-animation">
              <div className="loading-circle"></div>
            </div>
          )}

          <img className="startup-logo" src={windowsLogo} alt="Windows Logo" />
        </div>

        {/* Barra de navegación */}
        {this.state.powerOn && this.state.loadingComplete && (
          <div>
            <div className="navigation-bar">
              {/* Barra de búsqueda */}
              <div className="taskbar-search">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={this.state.searchQuery}
                  onChange={this.handleSearchInputChange}
                />
              </div>

              {this.state.executables
                .filter((executable) =>
                  executable.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
                )
                .map((executable, index) => (
                  <div
                    className={`folder ${executable.isOpen ? 'open' : ''}`}
                    key={index}
                    onClick={() => this.toggleExecutable(index)}
                  >
                    <img src={executable.icon} alt={executable.name} className="executable-icon" />
                    <p className="executable-name">{executable.name}</p>
                  </div>
                ))}
            </div>

            {/* Ventanas emergentes */}
            <div className="popup-windows">
              {this.state.openWindows.map((window, index) => window)}
            </div>

            {/* Barra de tareas */}
            <div className="taskbar">
              {/* Agrega el ícono de Windows a la barra de tareas */}
              <div className="taskbar-icon">
                <img src={windowsLogo} alt="Windows Logo" />
              </div>

              <div className="taskbar-icon1" onClick={() => this.openApp(appIcon1)}>
                <img src={appIcon1} alt="App 1" />
              </div>

              <div className="taskbar-icon2" onClick={() => this.openApp(appIcon2)}>
                <img src={appIcon2} alt="App 2" />
              </div>
            </div>
          </div>
        )}
      </div>
    );  }
}

export default PC;
