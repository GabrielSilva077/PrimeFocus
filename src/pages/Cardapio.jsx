import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/menu.css";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Card from "../components/Card";
import "../layout/cardapio.css";

gsap.registerPlugin(ScrollTrigger);

export default function CardapioSection() {
  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".paiMenu",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2 }
    );
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <section className="paiMenu">
        <div className="pfMenu">
          <h1 className="titleMenu">Nosso Cardápio</h1>
          <p className="pMenu">
            Descubra nossa seleção de cafés especiais e delícias para acompanhar
          </p>
          <div className="mineNav">
            <p className="pI">Café </p>
            <p>Bebidas Especiais</p>
            <p>Doces</p>
            <p className="pF">Salgados</p>
          </div>
        </div>

        <div>
          <Card />
        </div>
      </section>
    </>
  );
}
