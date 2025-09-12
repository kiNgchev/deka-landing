import {setupThemeToggle} from "./scripts";

function App() {
  return (
    <>
      <div className="floating-particles" id="particles"></div>

      <nav>
        <div className="nav-container">
          <div className="logo-container">
            <div className="logo-img"></div>
            <a href="#" className="logo-text">DekaMusic - ловит даже в горах!</a>
          </div>
          <div className="nav-links">
            <a href="#">Телеграмм</a>
            <a href="#">О нас</a>
            <a href="#">Премиум</a>
            <a href="#">Web-версия</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="canvas-container">
          <canvas id="backgroundCanvas"></canvas>
        </div>
        <div className="hero-content">
          <div className="container">
            <h1>Музыка на любой высоте</h1>
            <p>Слушай музыку в нашем приложении на любой широте, долготе и высоте! Даже на вершине
                Эльбруса!</p>
            <a href="#" className="cta-button">Начать слушать</a>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <section className="features">
        <div className="container">
          <h2>Почему DekaMusic?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Высокое качество</h3>
              <p>Наслаждайтесь музыкой в высоком качестве даже при медленном соединении!</p>
            </div>
            <div className="feature-card">
              <h3>Open-Source</h3>
              <p>Крутите приложение так, как вам удобно!</p>
            </div>
            <div className="feature-card">
              <h3>Мы бездари</h3>
              <p>Поддержите нас премиумом, а мы дадим вам классные плюшки!</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      <div className="theme-toggle" id="themeToggle" onClick={setupThemeToggle}>
        <div className="sun-rays"></div>
      </div>
    </>
  )
}

export default App
