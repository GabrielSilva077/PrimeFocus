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
      <div>
        <div className="footer-container">
          {/* Logo / Nome */}
          <div className="footer-logo">
            <h1>Prime Focus</h1>
            <p>CAPTURE THE STORY</p>
          </div>

          {/* Redes sociais */}
          <div className="footer-social">
            <h2>Siga-nos</h2>
            <div className="social-icons">
              <a href="https://www.facebook.com/?locale=pt_BR" target="_blank" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://x.com/?lang=pt" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Fotografia Autoral. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
