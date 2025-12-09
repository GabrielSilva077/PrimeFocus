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
              end: "15% bottom",
              scrub: 0.5,
            },
          })
          .to(".imgCamera", {
            rotation: 80,
            yPercent: 120,
            xPercent: -30,
            ease: "none",
            scale: 1.1,
          })
          .to(".imgCamera", {
            rotation: 90,
            yPercent: 130,
            xPercent: -30,
            ease: "none",
            scale: 1.2,
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







































// import { useRef, useLayoutEffect, useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import "../layout/home.css";
// import camera from "../assets/camera.png";
// import miniCamera from "../assets/cameraPequena.png";
// import imgSobre from "../assets/imgSobre.png";
// import Navbar from "../components/Navbar";
// import PercentCounter from "../components/PercentCounter";
// import GallerySection from "../components/Portfolio";
// import HeaderHero from "../components/HeaderHero";
// import AboutMini from "../components/sections/AboutMini";
// import Resultados from "../components/sections/Resultados";
// import SobreMim from "../components/sections/SobreMim";
// import Services from "../components/sections/Services";
// import Contact from "../components/sections/Contact";

// gsap.registerPlugin(ScrollTrigger);

// export default function HeroSection() {
//   const navbarRef = useRef(null);
//   const linhaRef = useRef(null);
//   const btnRef = useRef(null);
//   const paiRef = useRef(null); // ref para .paiCabecalho
//   const initializedRef = useRef(false); // evita inicializar duas vezes

//   // Força scroll para o topo
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       window.scrollTo(0, 0);
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     window.scrollTo(0, 0);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   // Util: espera todas as imagens dentro do container carregarem
//   function waitImagesLoad(container = document) {
//     const imgs = Array.from(container.querySelectorAll("img"));
//     if (!imgs.length) return Promise.resolve();
//     const promises = imgs.map((img) => {
//       if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
//       return new Promise((resolve) => {
//         const onLoadOrError = () => {
//           img.removeEventListener("load", onLoadOrError);
//           img.removeEventListener("error", onLoadOrError);
//           resolve();
//         };
//         img.addEventListener("load", onLoadOrError);
//         img.addEventListener("error", onLoadOrError);
//       });
//     });
//     return Promise.all(promises);
//   }

//   // Limpeza completa de timelines e triggers
//   function killAllGsap() {
//     try {
//       gsap.globalTimeline.clear();
//       ScrollTrigger.getAll().forEach((st) => st.kill());
//       gsap.killTweensOf(".imgCamera");
//     } catch (e) {
//       // ignore
//     }
//   }

//   // Principal - usa useLayoutEffect para garantir medições corretas
//   useLayoutEffect(() => {
//     let mm; // matchMedia instance (guard)
//     let resizeObserver;
//     let resizeHandlerDebounced;
//     let mounted = true;

//     async function initAnimations() {
//       if (!paiRef.current) return;
//       // espera imagens do header + pai carregarem
//       await waitImagesLoad(paiRef.current);

//       if (!mounted) return;

//       // garante limpar qualquer coisa antiga
//       killAllGsap();

//       // DEBUG: mostre a largura e qual media query ativou
//       console.log("[HeroSection] viewport width:", window.innerWidth);

//       // --- animação inicial standalone (entradas) ---
//       gsap.set(".imgCamera", { rotation: 0 });
//       const tl = gsap.timeline();
//       tl.fromTo(
//         ".imgCamera",
//         { x: 1, opacity: 0, rotation: 0 },
//         { x: 0, opacity: 1, duration: 1 },
//         "-=0.3"
//       )
//         .to(".imgCamera", { rotation: 30, duration: 0.5, delay: 0.5 })
//         .fromTo(
//           ".titleHome",
//           { scale: 0.1, opacity: 0, y: 30 },
//           { scale: 1, opacity: 1, y: 0, duration: 0.6 },
//           "<"
//         )
//         .fromTo(
//           navbarRef.current,
//           { y: -50, opacity: 0 },
//           { y: 0, opacity: 1, duration: 1 },
//           "<"
//         )
//         .fromTo(
//           linhaRef.current,
//           { x: -50, opacity: 0 },
//           { x: 0, opacity: 1, duration: 1 },
//           "<"
//         )
//         .fromTo(
//           btnRef.current,
//           { x: -50, opacity: 0 },
//           { x: 0, opacity: 1, duration: 1 },
//           "<"
//         )
//         .fromTo(
//           ".imgCameraP",
//           { scale: 0.1, opacity: 0, y: 30 },
//           { scale: 1, opacity: 1, y: 0, duration: 0.6 },
//           "<"
//         )
//         .fromTo(
//           ".DivSobre",
//           { y: 0, opacity: 0 },
//           { y: -20, opacity: 1, duration: 0.6 },
//           "<"
//         )
//         .fromTo(
//           ".percent",
//           { y: 0, opacity: 0 },
//           { y: -20, opacity: 1, duration: 0.6 },
//           "<"
//         )
//         .set(".imgCamera", { rotation: 30 });

//       // --- matchMedia + scrollTriggers ---
//       // usamos breakpoints levemente mais altos para cobrir celulares com DPIs grandes
//       mm = ScrollTrigger.matchMedia({
//         // MOBILE
//         "(max-width: 900px)": function () {
//           console.log("[HeroSection] matchMedia: mobile active");
//           const tlMobile = gsap.timeline({
//             scrollTrigger: {
//               trigger: ".paiCabecalho",
//               start: "top top",
//               end: "25% bottom",
//               scrub: 1,
//             },
//           });

//           tlMobile.to(".imgCamera", {
//             rotation: 80,
//             yPercent: 120,
//             xPercent: -30,
//             ease: "none",
//             scale: 1.1,
//           });
//           tlMobile.to(".imgCamera", {
//             rotation: 90,
//             yPercent: 130,
//             xPercent: -30,
//             ease: "none",
//             scale: 1.2,
//           });

//           gsap.fromTo(
//             ".seSobre",
//             { x: 50, opacity: 0 },
//             {
//               x: 0,
//               opacity: 1,
//               ease: "none",
//               scrollTrigger: {
//                 trigger: ".seSobre",
//                 start: "top 80%",
//                 end: "top 50%",
//                 scrub: 1,
//               },
//             }
//           );

//           gsap.fromTo(
//             ".Resultados",
//             { y: 100, opacity: 0 },
//             {
//               y: 0,
//               opacity: 1,
//               ease: "none",
//               scrollTrigger: {
//                 trigger: ".Resultados",
//                 start: "top 85%",
//                 end: "top 55%",
//                 scrub: 1,
//               },
//             }
//           );
//         },

//         // DESKTOP
//         "(min-width: 901px)": function () {
//           console.log("[HeroSection] matchMedia: desktop active");
//           const tlDesk = gsap.timeline({
//             scrollTrigger: {
//               trigger: ".paiCabecalho",
//               start: "top top",
//               end: "37% bottom",
//               scrub: 1,
//             },
//           });

//           tlDesk.to(".imgCamera", {
//             rotation: 80,
//             yPercent: 80,
//             ease: "none",
//             scale: 1,
//           });
//           tlDesk.to(".imgCamera", {
//             rotation: 90,
//             yPercent: 80,
//             xPercent: 0,
//             ease: "none",
//             scale: 1.1,
//           });
//         },
//       });

//       // força um refresh depois de tudo (images + matchMedia)
//       setTimeout(() => {
//         ScrollTrigger.refresh();
//         console.log("[HeroSection] ScrollTrigger.refresh called");
//       }, 60);

//       // adiciona um debounced resize para debugar e forçar refresh se necessário
//       resizeHandlerDebounced = debounce(() => {
//         console.log("[HeroSection] resize handler, width:", window.innerWidth);
//         ScrollTrigger.refresh();
//       }, 200);

//       window.addEventListener("resize", resizeHandlerDebounced);

//       // Em alguns navegadores móveis a UI chrome altera o viewport sem disparar resize - observe visibility change
//       document.addEventListener("visibilitychange", () => {
//         if (document.visibilityState === "visible") {
//           ScrollTrigger.refresh();
//         }
//       });

//       // opcional: observe mudanças no pai para refrescar
//       if ("ResizeObserver" in window) {
//         resizeObserver = new ResizeObserver(() => {
//           ScrollTrigger.refresh();
//         });
//         if (paiRef.current) resizeObserver.observe(paiRef.current);
//       }

//       initializedRef.current = true;
//     } // fim initAnimations

//     // inicia após micro-tarefa para garantir mount
//     const t = setTimeout(() => {
//       initAnimations();
//     }, 0);

//     return () => {
//       mounted = false;
//       clearTimeout(t);
//       if (resizeHandlerDebounced)
//         window.removeEventListener("resize", resizeHandlerDebounced);
//       if (resizeObserver && paiRef.current)
//         resizeObserver.unobserve(paiRef.current);
//       // limpa matchMedia e triggers
//       try {
//         if (mm && mm.revert) {
//           mm.revert(true);
//         } else {
//           ScrollTrigger.getAll().forEach((st) => st.kill());
//         }
//       } catch (e) {
//         // ignore
//       }
//       killAllGsap();
//     };
//   }, []); // useLayoutEffect roda uma vez

//   // util debounce
//   function debounce(fn, ms = 100) {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => fn.apply(this, args), ms);
//     };
//   }

//   return (
//     <>
//       <Navbar navbarRef={navbarRef} linhaRef={linhaRef} btnRef={btnRef} />

//       <div className="paiCabecalho" id="Home" ref={paiRef}>
//         <HeaderHero camera={camera} miniCamera={miniCamera} />

//         <AboutMini />

//         <Resultados PercentCounter={PercentCounter} />

//         <SobreMim imgSobre={imgSobre} />

//         <section className="portfolio">
//           <GallerySection />
//         </section>

//         <section className="services">
//           <Services />
//         </section>

//         <section className="Contact">
//           <Contact />
//         </section>
//       </div>
//     </>
//   );
// }
