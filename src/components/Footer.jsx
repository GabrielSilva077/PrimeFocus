// Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "../layout/footer.css";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  // Função para ir para a Home e scroll suave até a seção
  const goToSection = (sectionId) => {
    navigate("/", { state: { scrollTo: sectionId } });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo / Nome */}
        <div className="footer-logo">
          <h1>CoffeTime</h1>
          <p>O sabor que desperta seus melhores momentos.</p>
        </div>

        {/* Navegação */}
        <div className="footer-menu">
          <h2>Menu</h2>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => {
                  setTimeout(() => {
                    const el = document.getElementById("paiCabecalho");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/cardapio"
                onClick={() => {
                  setTimeout(() => {
                    const el = document.getElementById("paiMenu");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                Cardápio
              </Link>
            </li>
            <li>
              <button
                className="footer-link"
                onClick={() => goToSection("about")}
              >
                Sobre Nós
              </button>
            </li>
            <li>
              <button
                className="footer-link"
                onClick={() => goToSection("contact")}
              >
                Contato
              </button>
            </li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div className="footer-social">
          <h2>Siga-nos</h2>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copy">
        © {new Date().getFullYear()} CoffeTime. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
