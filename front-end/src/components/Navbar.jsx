import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import "../layout/nav.css";

const Navbar = ({ navbarRef, linhaRef, btnRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);
  const location = useLocation();
  const navigate = useNavigate();

  // SE ESTIVER NA TELA DE GALLERY → MOSTRA APENAS VOLTAR
  if (location.pathname === "/gallery") {
    return (
      <nav className="navbar" ref={navbarRef}>
        <div className="gallery-back-btn" onClick={() => navigate("/")}>
          {/* Ícone de seta */}
          <span style={{ fontSize: "1.5rem" }}>←</span>
          <span>Voltar</span>
        </div>
      </nav>
    );
  }

  // NAV NORMAL (QUALQUER OUTRA PÁGINA)
  return (
    <nav className="navbar" ref={navbarRef}>
      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        ref={btnRef}
      >
        {/* <span className="bar"></span>
        <span className="bar barT"></span>
        <span className="bar"></span> */}
      </div>

      <ul className={`nav-list ${isOpen ? "active" : ""}`}>
        <li>
          <Link
            to="/"
            onClick={() => {
              closeMenu();
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
          >
            <div>Home</div>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            onClick={() => {
              closeMenu();
              setTimeout(() => {
                const el = document.getElementById("About");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }, 200);
            }}
          >
            <div>Sobre</div>
          </Link>
        </li>

        <li>
          <Link
            to="/cardapio"
            onClick={() => {
              closeMenu();
              setTimeout(() => {
                const el = document.getElementById("paiMenu");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            <div>Cardapio</div>
          </Link>
        </li>

        <li>
          <Link
            to="/gallery"
            onClick={() => {
              closeMenu();
              setTimeout(() => {
                const el = document.getElementById("about");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          >
            <div>Galeria</div>
          </Link>
        </li>

        <li>
          <Link
            to="/"
            onClick={() => {
              closeMenu();
              setTimeout(() => {
                const el = document.getElementById("location");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }, 200);
            }}
          >
            <div>Localização</div>
          </Link>
        </li>

        <li>
          <Link
            to="/Contact"
            onClick={() => {
              closeMenu();
              setTimeout(() => {
                const el = document.getElementById("paiContact");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }, 200);
            }}
          >
            <div>Contato</div>
          </Link>
        </li>
      </ul>

      <p className="linha" ref={linhaRef}></p>

      <div className="nomeImg">
        <img src={Logo} alt="" className="logo logoImg" />
        <div className="logo logoName">Prime.Focus</div>
      </div>

      <Link
        to={location.pathname === "/gallery" ? "/" : "/gallery"}
        className="linkPort"
        onClick={() => setIsOpen(false)}
      >
        {location.pathname === "/gallery" ? "Home" : "Ver Portfólio"}
      </Link>
    </nav>
  );
};

export default Navbar;
