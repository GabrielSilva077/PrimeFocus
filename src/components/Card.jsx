import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Model3d from "../components/Modelo3D";
import "../layout/card.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const cardRef = useRef(null); // ref para a div principal
  const textRef = useRef(null); // ref para o texto
  const modelRef = useRef(null); // ref para o modelo 3D

  useEffect(() => {
    if (cardRef.current && textRef.current && modelRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardRef.current, // dispara quando a div entra na tela
          start: "top 80%", // topo do elemento atinge 80% da viewport
          toggleActions: "play none none reverse",
        },
      });

      // anima o card inteiro (fade in + subida)
      tl.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // anima o texto com delay (stagger)
      tl.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4" // começa 0.4s antes do fim da animação do card
      );

      // anima o modelo 3D com delay
      tl.fromTo(
        modelRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.5" // começa junto com o texto
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className="segundaTela"
      style={{ opacity: 0 }}
    >
      <div className="aliText" ref={textRef}>
        <p className="textTela2">special edition</p>
      </div>
      <div ref={modelRef}>
        <Model3d className="img3d" />
      </div>
    </div>
  );
}
