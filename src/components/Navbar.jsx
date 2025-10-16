// import { useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Logo from "../assets/iconCafé.png";
// import "../layout/nav.css";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// const Navbar = () => {
//   const navbarRef = useRef(null);

//   // Animação GSAP
//   useGSAP(() => {
//     const nav = navbarRef.current;
//     if (!nav) return;
//     gsap.fromTo(nav, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
//   }, []);

//   const [isOpen, setIsOpen] = useState(false);
//   const toggleMenu = () => setIsOpen(!isOpen);

//   // Fecha o menu sem alterar os scrolls existentes
//   const closeMenu = () => setIsOpen(false);

//   return (
//     <nav className="navbar" ref={navbarRef}>
//       <div className="nomeImg">
//         <img src={Logo} alt="" className="logo logoImg" />
//         <div className="logo logoName">G.Bean</div>
//       </div>

//       <div
//         className={`menu-toggle ${isOpen ? "open" : ""}`}
//         onClick={toggleMenu}
//       >
//         <span className="bar"></span>
//         <span className="bar barT"></span>
//         <span className="bar"></span>
//       </div>

//       <ul className={`nav-list ${isOpen ? "active" : ""}`}>
//         <li>
//           <Link
//             to="/"
//             onClick={() => {
//               closeMenu();
//               setTimeout(() => {
//                 const el = document.getElementById("Home");
//                 if (el) {
//                   el.scrollIntoView({ behavior: "smooth", block: "center" });
//                 }
//               }, 200);
//             }}
//           >
//             <div>Home</div>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/"
//             onClick={() => {
//               closeMenu();
//               setTimeout(() => {
//                 const el = document.getElementById("About");
//                 if (el) {
//                   el.scrollIntoView({ behavior: "smooth", block: "center" });
//                 }
//               }, 200);
//             }}
//           >
//             <div>Sobre</div>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/cardapio"
//             onClick={() => {
//               closeMenu();
//               setTimeout(() => {
//                 const el = document.getElementById("paiMenu");
//                 if (el) el.scrollIntoView({ behavior: "smooth" });
//               }, 100);
//             }}
//           >
//             <div>Cardapio</div>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/gallery"
//             onClick={() => {
//               closeMenu();
//               setTimeout(() => {
//                 const el = document.getElementById("about");
//                 if (el) el.scrollIntoView({ behavior: "smooth" });
//               }, 100);
//             }}
//           >
//             <div>Galeria</div>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/"
//             onClick={() => {
//               closeMenu();
//               setTimeout(() => {
//                 const el = document.getElementById("location");
//                 if (el) {
//                   el.scrollIntoView({ behavior: "smooth", block: "center" });
//                 }
//               }, 200);
//             }}
//           >
//             <div>Localização</div>
//           </Link>
//         </li>
//         <li>
//           <Link
//             to="/Contact"
//             onClick={() => {
//               closeMenu();
//               setTimeout(() => {
//                 const el = document.getElementById("paiContact");
//                 if (el) {
//                   el.scrollIntoView({ behavior: "smooth", block: "center" });
//                 }
//               }, 200);
//             }}
//           >
//             <div>Contato</div>
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "../assets/iconCafé.png";
import "../layout/nav.css";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const nomeRef = useRef(null);
  const textRef = useRef(null);

  // Animação GSAP
  useGSAP(() => {
    const nav = navbarRef.current;
    const logo = logoRef.current;
    const nome = nomeRef.current;
    const text = textRef.current;

    if (!nav || !logo) return;

    const cssColor = getComputedStyle(nav).backgroundColor;
    const tl = gsap.timeline({});

    // 1️⃣ Mantém altura grande e cor preta inicialmente
    tl.set(nav, { height: "1000px", backgroundColor: "black" });
    tl.set(logo, { height: "600px", width: "600px" }); // tamanho inicial do logo

    // 2️⃣ Mantém altura grande por 5 segundos
    tl.to(nav, { height: "1000px", duration: 1 });

    // 3️⃣ Anima para altura normal e, **ao mesmo tempo**, muda a cor e diminui logo
    tl.to(nav, {
      height: "60px",
      backgroundColor: cssColor,
      duration: 1,
      ease: "power2.inOut",
    });
    tl.to(
      logo,
      { height: "60px", width: "60px", duration: 1, ease: "power2.inOut" },
      "<"
    ); // "<" = anima junto

    // 4️⃣ Logo, nome e texto animam depois
    tl.fromTo(logo, { x: 500 }, { x: 0, duration: 1 }, "<");

    // ⏰ Dispara o evento logo antes de começar a animar o nome/texto
    tl.add(() => {
      window.__navbarAnimationDone = true;
      window.dispatchEvent(new Event("navbarAnimationComplete"));
    });

    tl.fromTo(nome, { opacity: 0, y: -50 }, { opacity: 1, y: 0 }, "+=0.2");
    tl.fromTo(text, { opacity: 0, y: -50 }, { opacity: 1, y: 0 }, "<");
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  // Fecha o menu sem alterar os scrolls existentes
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="nomeImg">
        <img src={Logo} alt="" className="logo logoImg" ref={logoRef} />
        <div className="logo logoName" ref={nomeRef}>
          G.Bean
        </div>
      </div>

      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="bar"></span>
        <span className="bar barT"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-list ${isOpen ? "active" : ""}`} ref={textRef}>
        <li>
          <Link
            to="/"
            onClick={() => {
              closeMenu();
              setTimeout(() => {
                const el = document.getElementById("Home");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }, 200);
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
    </nav>
  );
};

export default Navbar;
