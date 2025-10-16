// import { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import "../layout/menu.css";
// import Card from "../components/Card";
// import { Link } from "react-router-dom";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// export default function MenuSection() {
//   // Refs para cada elemento a ser animado
//   const paiMenuRef = useRef(null);
//   const bestSellersRef = useRef(null);
//   const cardsRef = useRef(null);
//   const verMaisRef = useRef(null);

//   // Animação GSAP com useGSAP
//   useGSAP(() => {
//     const tl = gsap.timeline();

//     tl.fromTo(
//       paiMenuRef.current,
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.2 }
//     )
//       .fromTo(
//         bestSellersRef.current,
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 }
//       )
//       .fromTo(
//         cardsRef.current,
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5 }
//       )
//       .fromTo(
//         verMaisRef.current,
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5 }
//       );
//   }, []);

//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <section className="paiMenu" ref={paiMenuRef}>
//         <div className="cards" ref={cardsRef}>
//           <h2 className="bestSellers" ref={bestSellersRef}>
//             Best Sellers
//           </h2>
//           <Card limit={4} modalOffset={-520} />
//         </div>

//         <Link
//           to="/cardapio"
//           onClick={() => {
//             setTimeout(() => {
//               const el = document.getElementById("paiMenu");
//               if (el) el.scrollIntoView({ behavior: "smooth" });
//             }, 100);
//           }}
//         >
//           <div className="VerMais" ref={verMaisRef}>
//             Ver Mais
//           </div>
//         </Link>
//       </section>
//     </>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/menu.css";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const paiMenuRef = useRef(null);
  const bestSellersRef = useRef(null);
  const cardsRef = useRef(null);
  const verMaisRef = useRef(null);
  const animationStartedRef = useRef(false);

  const startMenuAnimation = () => {
    if (animationStartedRef.current) return;
    animationStartedRef.current = true;

    // timeline da animação do menu
    const tl = gsap.timeline();

    gsap.set(
      [
        paiMenuRef.current,
        bestSellersRef.current,
        cardsRef.current,
        verMaisRef.current,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    tl.to(paiMenuRef.current, { y: 0, opacity: 1, duration: 0.3 })
      .to(bestSellersRef.current, { y: 0, opacity: 1, duration: 0.6 }, "-=0.1")
      .to(cardsRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
      .to(verMaisRef.current, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
  };

  // Espera o evento do Navbar
  useEffect(() => {
    const handle = () => startMenuAnimation();

    if (window.__navbarAnimationDone) {
      startMenuAnimation(); // se navbar já terminou
    } else {
      window.addEventListener("navbarAnimationComplete", handle);
    }

    return () => {
      window.removeEventListener("navbarAnimationComplete", handle);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <section className="paiMenu" ref={paiMenuRef}>
      <div className="cards" ref={cardsRef}>
        <h2 className="bestSellers" ref={bestSellersRef}>
          Best Sellers
        </h2>
        <Card limit={4} modalOffset={-520} />
      </div>

      <Link
        to="/cardapio"
        onClick={() => {
          setTimeout(() => {
            const el = document.getElementById("paiMenu");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      >
        <div className="VerMais" ref={verMaisRef}>
          Ver Mais
        </div>
      </Link>
    </section>
  );
}
