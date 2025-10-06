import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/menu.css";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  // Refs para cada elemento a ser animado
  const paiMenuRef = useRef(null);
  const bestSellersRef = useRef(null);
  const cardsRef = useRef(null);
  const verMaisRef = useRef(null);

  // Animação GSAP com useGSAP
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      paiMenuRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2 }
    )
      .fromTo(
        bestSellersRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
      .fromTo(
        verMaisRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <section className="paiMenu" ref={paiMenuRef}>
        <div className="cards" ref={cardsRef}>
          <h2 className="bestSellers" ref={bestSellersRef}>
            Best Sellers
          </h2>
          <Card limit={4} />
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
    </>
  );
}
