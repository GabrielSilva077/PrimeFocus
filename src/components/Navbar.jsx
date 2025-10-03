import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- importante
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../assets/iconCafé.png";
import "../layout/nav.css";

const Navbar = () => {
  useLayoutEffect(() => {
    gsap.fromTo(
      ".navbar",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    );
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nomeImg">
        <img src={Logo} alt="" className="logo logoImg" />
        <div className="logo logoName">G.Bean</div>
      </div>
      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar barT"></span>
      </div>

      <ul className={`nav-list ${isOpen ? "active" : ""}`}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a
            href="#About"
            onClick={(e) => {
              e.preventDefault();
              const section = document.querySelector("#About");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => ScrollTrigger.refresh(), 300);
              }
            }}
          >
            Sobre
          </a>
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
            <div>Cardapio</div>
          </Link>
        </li>
        <li>
          <Link to="/gallery">Galeria</Link>
        </li>
        <li>
          <Link to="/location">Localização</Link>
        </li>
        <li>
          <Link to="/contact">Contato</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
