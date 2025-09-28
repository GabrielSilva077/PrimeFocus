import { useLayoutEffect, useRef } from "react";
import "../layout/nav.css";
import { useState } from "react";
import Logo from "../assets/iconCafé.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Navbar = () => {
  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".navbar",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nomeImg">
        <img src={Logo} alt="" className="logo" />
        <div className="logo">G.Bean</div>
      </div>
      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-list ${isOpen ? "active" : ""}`}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Sobre</a>
        </li>
        <li>
          <a href="#">Cardápio</a>
        </li>
        <li>
          <a href="#">Galeria</a>
        </li>
        <li>
          <a href="#">Localização</a>
        </li>
        <li>
          <a href="#">Contato</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
