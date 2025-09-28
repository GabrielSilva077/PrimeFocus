import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/home.css";
import Arrow from "../assets/arrow.png";
import plano1 from "../assets/planof.png";
import plano2 from "../assets/planof2.png";
import plano3 from "../assets/planof3.png";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [plano1, plano2, plano3];

  // Troca automática das imagens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Animação GSAP
  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".paiCabecalho",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
      .fromTo(
        ".titleHome",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
      .fromTo(
        ".btn",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
  }, []);

  // Funções para setas
  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div
      className="paiCabecalho"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <h1 className="titleHome">Golden Bean</h1>
      <a href="#">
        <div className="btn">
          <p className="goMenu">Ver Cardapio</p>
          <img src={Arrow} alt="" className="arrow" />
        </div>
      </a>

      {/* Setas de navegação */}
      <button className="arrowLeft" onClick={prevImage}>
        &#10094;
      </button>
      <button className="arrowRight" onClick={nextImage}>
        &#10095;
      </button>
    </div>
  );
}
