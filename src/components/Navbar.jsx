import { useState, useRef } from "react";
import { Link } from "react-router-dom"; // <-- importante
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../assets/iconCafé.png";
import "../layout/nav.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navbarRef = useRef(null); // ref para navbar

  // Animação GSAP
  useGSAP(() => {
    const nav = navbarRef.current;
    if (!nav) return;

    gsap.fromTo(nav, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="nomeImg">
        <img src={Logo} alt="" className="logo logoImg" />
        <div className="logo logoName">G.Bean</div>
      </div>
      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar barT"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-list ${isOpen ? "active" : ""}`}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => {
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
          <a
            href="#location"
            onClick={(e) => {
              e.preventDefault();
              const section = document.querySelector("#About");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => ScrollTrigger.refresh(), 300);
              }
            }}
          >
            Localização
          </a>
        </li>
        <li>
          <Link to="/contact">Contato</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
