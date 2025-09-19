import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jaqueta from "./assets/jaquetaH2.png"; // sua imagem
import jaqueta2 from "./assets/jaquetalevantado.png"; // sua imagem
import "./layout/home.css";
import Model3d from "./components/Modelo3D";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);
  const nextContentRef = useRef(null);
  let tl = gsap.timeline();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "20%",
          // end: "+=800", // anima até 800px de scroll
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        ".justDoIt",
        { opacity: 1, y: 0 },
        { opacity: 0, y: 0, duration: 1 }
      );

      // 1️⃣ Fade out do texto inicial
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 1,
      });

      tl.to(contentRef.current, {
        opacity: 0,
        duration: 1,
      });

      // 2️⃣ Zoom no capuz
      tl.to(
        imgRef.current,
        {
          scale: 10,
          transformOrigin: "50% 20%", // ajuste no capuz
          duration: 1,
        },
        "<"
      );

      // 3️⃣ Overlay preto cobre a tela (mais rápido)
      tl.to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.1, // antes era 1.5
        },
        "-=0.3"
      );

      // 4️⃣ Some com a imagem da jaqueta
      tl.to(
        imgRef.current,
        {
          opacity: 0,
          duration: 0.1, // antes era 0.5
        },
        "<"
      ); // "<" = acontece ao mesmo tempo do overlay

      // 5️⃣ Próxima seção aparece de dentro (mais rápido + começa junto)
      tl.fromTo(
        nextContentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, // antes era 2
        "-=0.6" // começa antes do overlay terminar
      );

      // 6️⃣ Overlay some revelando de vez o site
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 1,
      });
      gsap.fromTo(
        ".testando",
        { y: 200, opacity: 0 },
        {
          y: -100,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testando", // só dispara quando essa img aparecer
            start: "top 50%", // começa quando o topo dela chega a 80% da tela
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section
        ref={containerRef}
        className="h-screen w-full relative overflow-hidden bg-black"
      >
        <p className="textImg1 justDoIt">Justdo</p>
        <img
          ref={imgRef}
          src={jaqueta} // imagem importada
          alt="Capuz"
          className="imgJaquetaH"
        />
        <p className="textImg2 justDoIt">It</p>

        {/* Texto inicial */}

        {/* Overlay preto */}
        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full bg-black opacity-0 pointer-events-none"
        />

        {/* Próxima seção escondida */}
        <div
          ref={nextContentRef}
          className="segundaTela"
          style={{ opacity: 0 }}
        >
          {/* <img src={jaqueta2} alt="" className="segundaImgJaqueta" /> */}
          <Model3d />
        </div>
      </section>

      {/* Continuação normal */}
      <section className="teste">
        <p>Segunda parte do site ✨</p>
      </section>
    </div>
  );
}
