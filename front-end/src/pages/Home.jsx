import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../layout/home.css";
import camera from "../assets/camera.png";
import miniCamera from "../assets/cameraPequena.png";
import imgSobre from "../assets/imgSobre.png";
import Navbar from "../components/Navbar";
import PercentCounter from "../components/PercentCounter";
import GallerySection from "../components/Portfolio";
import HeaderHero from "../components/HeaderHero";
import AboutMini from "../components/sections/AboutMini";
import Resultados from "../components/sections/Resultados";
import SobreMim from "../components/sections/SobreMim";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const navbarRef = useRef(null);
  const linhaRef = useRef(null);
  const btnRef = useRef(null);

  // ✅ Força scroll para o topo mesmo com F5 ou botão Voltar
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Também garante ao carregar a página
    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useGSAP(() => {
    // Estado inicial da câmera
    gsap.set(".imgCamera", { rotation: 0 });

    const tl = gsap.timeline();

    // Animação inicial
    tl.fromTo(
      ".imgCamera",
      { x: 1, opacity: 0, rotation: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "-=0.3"
    )
      .to(".imgCamera", { rotation: 30, duration: 0.5, delay: 0.5 })
      .fromTo(
        ".titleHome",
        { scale: 0.1, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6 },
        "<"
      )
      .fromTo(
        navbarRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "<"
      )
      .fromTo(
        linhaRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "<"
      )
      .fromTo(
        btnRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "<"
      )
      .fromTo(
        ".imgCameraP",
        { scale: 0.1, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6 },
        "<"
      )
      .fromTo(
        ".DivSobre",
        { y: 0, opacity: 0 },
        { y: -20, opacity: 1, duration: 0.6 },
        "<"
      )
      .fromTo(
        ".percent",
        { y: 0, opacity: 0 },
        { y: -20, opacity: 1, duration: 0.6 },
        "<"
      )
      .set(".imgCamera", { rotation: 30 });

    // não mexa daqui para cima

    ScrollTrigger.matchMedia({
      // ===========================
      // MOBILE
      // ===========================
      "(max-width: 768px)": function () {
        // --- animação da câmera ---
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".paiCabecalho",
              start: "top top",
              end: "50% bottom", // aumenta o range do scroll
              scrub: true, // mais fluido no mobile
            },
          })
          .to(".imgCamera", {
            rotation: 90,
            yPercent: 80, // reduzir o valor para caber na tela
            xPercent: -20, // menos deslocamento lateral
            scale: 1.1,
            ease: "none",
          });

        // --- animação do .seSobre ---
        gsap.fromTo(
          ".seSobre",
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".seSobre",
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );

        // --- animação do .Resultados ---
        gsap.fromTo(
          ".Resultados",
          { y: 100, opacity: 0 }, // pode mudar laterais
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".Resultados",
              start: "top 85%", // valores recomendados
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      },

      // ===========================
      // DESKTOP
      // ===========================
      "(min-width: 769px)": function () {
        // --- animação da câmera ---
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".paiCabecalho",
              start: "top top",
              end: "37% bottom",
              scrub: 1,
            },
          })
          .to(".imgCamera", {
            rotation: 80,
            yPercent: 80,
            ease: "none",
            scale: 1,
          })
          .to(".imgCamera", {
            rotation: 90,
            yPercent: 80,
            xPercent: 0,
            ease: "none",
            scale: 1.1,
          });
      },
    });

    // não mexa daqui para baixo

    // SCROLL: rotação até ficar reta + descer
    // gsap
    //   .timeline({
    //     scrollTrigger: {
    //       trigger: ".paiCabecalho",
    //       start: "top top",
    //       end: "37% bottom",
    //       scrub: 1,
    //     },
    //   })
    //   .to(".imgCamera", {
    //     rotation: 80,
    //     yPercent: 80,
    //     ease: "none",
    //     scale: 1,
    //   })
    //   .to(".imgCamera", {
    //     rotation: 90,
    //     yPercent: 80,
    //     ease: "none",
    //     scale: 1.2,
    //   });

    // Animação da seção SobreMim
    gsap.fromTo(
      ".SobreMim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".SobreMim",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
    gsap.fromTo(
      ".portfolio",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".portfolio",
          start: "top 80%",
          toggleActions: "play none play reverse",
        },
      }
    );
    gsap.fromTo(
      ".services",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services",
          start: "top 80%",
          toggleActions: "play none play reverse",
        },
      }
    );
    // gsap.fromTo(
    //   ".Contact",
    //   { y: 50, opacity: 0 },
    //   {
    //     y: 0,
    //     opacity: 1,
    //     duration: 1,
    //     ease: "power2.out",
    //     scrollTrigger: {
    //       trigger: ".services",
    //       start: "top 80%",
    //       toggleActions: "play reverse play reverse",
    //     },
    //   }
    // );
  }, []);
  return (
    <>
      <Navbar navbarRef={navbarRef} linhaRef={linhaRef} btnRef={btnRef} />

      <div className="paiCabecalho" id="Home">
        <HeaderHero camera={camera} miniCamera={miniCamera} />

        <AboutMini />

        <Resultados PercentCounter={PercentCounter} />

        <SobreMim imgSobre={imgSobre} />

        <section className="portfolio">
          <GallerySection />
        </section>

        <section className="services">
          <Services />
        </section>

        <section className="Contact">
          <Contact />
        </section>
      </div>
    </>
  );
}
