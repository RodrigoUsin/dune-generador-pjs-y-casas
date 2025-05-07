import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
//import DarkModeToggle from "../components/DarkModeToggle";
import "../styles/global.css";
import "../styles/components/layout.css";

const Layout = ({ title, children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <>
      {/*<DarkModeToggle />*/}
      <header className="header">
        <div className="banner">
          <h1 className="banner-text">
            Asistente para personajes y casas: Dune RPG{" "}
          </h1>
        </div>

        <StaticImage
          src="../../images/banner-desktop.png"
          alt="Banner Dune"
          className="banner"
          placeholder="blurred"
          layout="fullWidth"
        />
      </header>

      <button
        className={`menu-toggle ${isMenuOpen ? "active" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menú principal"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
      <div className="layout">
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Alternar menú"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/character"
                onClick={() => setIsMenuOpen(false)}
                className="nav-link"
                activeClassName="active"
                partiallyActive={true}
              >
                Creador de Personajes
              </Link>
            </li>
            <li>
              <Link
                to="/houses"
                onClick={() => setIsMenuOpen(false)}
                className="nav-link"
                activeClassName="active"
                partiallyActive={true}
              >
                Creador de Casas
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                Sobre este asistente
              </Link>
            </li>
          </ul>
        </nav>
        <main>
          <h1>{title}</h1>
          {children}
        </main>
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} Character Creator for Dune by RoUsin
            Dev
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
