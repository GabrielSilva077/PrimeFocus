// Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "../layout/footer.css";

const Footer = () => {
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
            <li><a href="#home">Início</a></li>
            <li><a href="#menu">Cardápio</a></li>
            <li><a href="#about">Sobre Nós</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div className="footer-social">
          <h2>Siga-nos</h2>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
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
