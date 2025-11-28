// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import "../layout/home.css";
// import camera from "../assets/camera.png";
// import miniCamera from "../assets/camerapequena.png";
// import imgSobre from "../assets/imgSobre.png";
// import Navbar from "../components/Navbar";
// import PercentCounter from "../components/PercentCounter";
// import { Link } from "react-router-dom";
// import GallerySection from "../components/Portfolio";

// gsap.registerPlugin(ScrollTrigger);

// export default function HeroSection() {
//   const navbarRef = useRef(null);
//   const linhaRef = useRef(null);
//   const btnRef = useRef(null);

//   useGSAP(() => {
//     // Estado inicial da câmera
//     gsap.set(".imgCamera", { rotation: 0 });

//     const tl = gsap.timeline();

//     // Animação inicial
//     tl.fromTo(
//       ".imgCamera",
//       { x: 1, opacity: 0, rotation: 0 },
//       { x: 0, opacity: 1, duration: 1 },
//       "-=0.3"
//     )
//       .to(".imgCamera", { rotation: 30, duration: 0.5, delay: 0.5 })
//       .fromTo(
//         ".titleHome",
//         { scale: 0.1, opacity: 0, y: 30 },
//         { scale: 1, opacity: 1, y: 0, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         navbarRef.current,
//         { y: -50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "<"
//       )
//       .fromTo(
//         linhaRef.current,
//         { x: -50, opacity: 0 },
//         { x: 0, opacity: 1, duration: 1 },
//         "<"
//       )
//       .fromTo(
//         btnRef.current,
//         { x: -50, opacity: 0 },
//         { x: 0, opacity: 1, duration: 1 },
//         "<"
//       )
//       .fromTo(
//         ".imgCameraP",
//         { scale: 0.1, opacity: 0, y: 30 },
//         { scale: 1, opacity: 1, y: 0, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         ".DivSobre",
//         { y: 0, opacity: 0 },
//         { y: -20, opacity: 1, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         ".percent",
//         { y: 0, opacity: 0 },
//         { y: -20, opacity: 1, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         ".btn",
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5 }
//       )
//       .set(".imgCamera", { rotation: 30 });

//     // SCROLL: rotação até ficar reta + descer
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: ".paiCabecalho",
//           start: "top top",
//           end: "50% bottom",
//           scrub: 1,
//         },
//       })
//       .to(".imgCamera", {
//         rotation: 80,
//         yPercent: 80,
//         ease: "none",
//         scale: 1,
//       })
//       .to(".imgCamera", {
//         rotation: 90, // mantém reta
//         yPercent: 80, // desce totalmente
//         ease: "none",
//         scale: 1.2,
//       });

//     // Animação da seção SobreMim
//     gsap.fromTo(
//       ".SobreMim",
//       { y: 50, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ".SobreMim",
//           start: "top 80%",
//           toggleActions: "play reverse play reverse",
//         },
//       }
//     );
//     gsap.fromTo(
//       ".portfolio",
//       { y: 50, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ".portfolio",
//           start: "top 80%", // inicia quando a seção entra na tela
//           toggleActions: "play reverse play reverse",
//         },
//       }
//     );
//   }, []);

//   return (
//     <>
//       <Navbar navbarRef={navbarRef} linhaRef={linhaRef} btnRef={btnRef} />

//       <div className="paiCabecalho" id="Home">
//         <section className="sectionCabecalho">
//           <img src={camera} alt="Camera" className="imgCamera" />
//           <img src={miniCamera} alt="Mini Camera" className="imgCameraP" />
//           <h2 className="titleHome">CAPTURE</h2>
//           <h2 className="titleHome">THE STORY</h2>
//         </section>

//         <section className="seSobre">
//           <div className="DivSobre">
//             <p className="heroSection">Capturando </p>
//             <p className="heroSection">Histórias</p>
//             <p className="heroSection">em cada detalhe</p>
//           </div>
//         </section>

//         <section className="Resultados">
//           <div className="percent">
//             <p className="percentH1">Clientes que contratam novamente</p>
//             <p className="linhaResult"></p>
//             <div className="numText">
//               <PercentCounter finalValue={82} duration={2000} />
//               <p className="pText">
//                 Qualidade e atendimento geram fidelização.
//               </p>
//             </div>
//           </div>
//           <div className="percent">
//             <p className="percentH1">Aumento do impacto visual nas redes</p>
//             <p className="linhaResult"></p>
//             <div className="numText">
//               <PercentCounter finalValue={47} duration={2000} />
//               <p className="pText">
//                 Fotos profissionais valorizam marcas e perfis.
//               </p>
//             </div>
//           </div>
//           <div className="percent">
//             <p className="percentH1">De experiência na fotografia</p>
//             <p className="linhaResult"></p>
//             <div className="numText">
//               <PercentCounter
//                 finalValue={12}
//                 duration={2000}
//                 showPercent={false}
//               />
//               <p className="pText">
//                 Especialista em retratos, ensaios e eventos.
//               </p>
//             </div>
//           </div>
//         </section>

//         <section className="SobreMim">
//           <div>
//             <h2>Sobre Mim</h2>
//             <p>
//               Há mais de uma década, dedico-me à arte de contar histórias
//               através da fotografia. Cada imagem é uma narrativa visual
//               cuidadosamente construída, onde luz, composição e emoção se
//               encontram. Meu trabalho é guiado pela busca da autenticidade e
//               pela valorização dos pequenos detalhes que tornam cada momento
//               único e irrepetível. Fotografia é mais que técnica — é
//               sensibilidade, é arte, é eternizar o efêmero.
//             </p>
//           </div>
//           <div>
//             <img src={imgSobre} alt="" className="imgSobre" />
//           </div>
//         </section>

//         <section className="portfolio">
//           <GallerySection />
//         </section>
//       </div>
//     </>
//   );
// }



//antes de voltar para o top com f5
// import { useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import "../layout/home.css";
// import camera from "../assets/camera.png";
// import miniCamera from "../assets/camerapequena.png";
// import imgSobre from "../assets/imgSobre.png";
// import Navbar from "../components/Navbar";
// import PercentCounter from "../components/PercentCounter";
// import GallerySection from "../components/Portfolio";
// import HeaderHero from "./sections/HeaderHero";
// import AboutMini from "./sections/AboutMini";
// import Resultados from "./sections/Resultados";
// import SobreMim from "./sections/SobreMim";
// import Services from "./sections/Services";
// import Contact from "./sections/Contact";

// gsap.registerPlugin(ScrollTrigger);

// export default function HeroSection() {
//   const navbarRef = useRef(null);
//   const linhaRef = useRef(null);
//   const btnRef = useRef(null);

//   useGSAP(() => {
//     // Estado inicial da câmera
//     gsap.set(".imgCamera", { rotation: 0 });

//     const tl = gsap.timeline();

//     // Animação inicial
//     tl.fromTo(
//       ".imgCamera",
//       { x: 1, opacity: 0, rotation: 0 },
//       { x: 0, opacity: 1, duration: 1 },
//       "-=0.3"
//     )
//       .to(".imgCamera", { rotation: 30, duration: 0.5, delay: 0.5 })
//       .fromTo(
//         ".titleHome",
//         { scale: 0.1, opacity: 0, y: 30 },
//         { scale: 1, opacity: 1, y: 0, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         navbarRef.current,
//         { y: -50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "<"
//       )
//       .fromTo(
//         linhaRef.current,
//         { x: -50, opacity: 0 },
//         { x: 0, opacity: 1, duration: 1 },
//         "<"
//       )
//       .fromTo(
//         btnRef.current,
//         { x: -50, opacity: 0 },
//         { x: 0, opacity: 1, duration: 1 },
//         "<"
//       )
//       .fromTo(
//         ".imgCameraP",
//         { scale: 0.1, opacity: 0, y: 30 },
//         { scale: 1, opacity: 1, y: 0, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         ".DivSobre",
//         { y: 0, opacity: 0 },
//         { y: -20, opacity: 1, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         ".percent",
//         { y: 0, opacity: 0 },
//         { y: -20, opacity: 1, duration: 0.6 },
//         "<"
//       )
//       .fromTo(
//         ".btn",
//         { y: 50, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5 }
//       )
//       .set(".imgCamera", { rotation: 30 });

//     // SCROLL: rotação até ficar reta + descer
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: ".paiCabecalho",
//           start: "top top",
//           end: "37% bottom",
//           scrub: 1,
//         },
//       })
//       .to(".imgCamera", {
//         rotation: 80,
//         yPercent: 80,
//         ease: "none",
//         scale: 1,
//       })
//       .to(".imgCamera", {
//         rotation: 90,
//         yPercent: 80,
//         ease: "none",
//         scale: 1.2,
//       });

//     // Animação da seção SobreMim
//     gsap.fromTo(
//       ".SobreMim",
//       { y: 50, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ".SobreMim",
//           start: "top 80%",
//           toggleActions: "play reverse play reverse",
//         },
//       }
//     );
//     gsap.fromTo(
//       ".portfolio",
//       { y: 50, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ".portfolio",
//           start: "top 80%",
//           toggleActions: "play reverse play reverse",
//         },
//       }
//     );
//     gsap.fromTo(
//       ".services",
//       { y: 50, opacity: 0 },
//       {
//         y: 0,
//         opacity: 1,
//         duration: 1,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ".services",
//           start: "top 80%",
//           toggleActions: "play reverse play reverse",
//         },
//       }
//     );
//     // gsap.fromTo(
//     //   ".Contact",
//     //   { y: 50, opacity: 0 },
//     //   {
//     //     y: 0,
//     //     opacity: 1,
//     //     duration: 1,
//     //     ease: "power2.out",
//     //     scrollTrigger: {
//     //       trigger: ".services",
//     //       start: "top 80%",
//     //       toggleActions: "play reverse play reverse",
//     //     },
//     //   }
//     // );
//   }, []);

//   return (
//     <>
//       <Navbar navbarRef={navbarRef} linhaRef={linhaRef} btnRef={btnRef} />

//       <div className="paiCabecalho" id="Home">
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



// voltando para o topo
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../layout/home.css";
import camera from "../assets/camera.png";
import miniCamera from "../assets/camerapequena.png";
import imgSobre from "../assets/imgSobre.png";
import Navbar from "../components/Navbar";
import PercentCounter from "../components/PercentCounter";
import GallerySection from "../components/Portfolio";
import HeaderHero from "../components/sections/HeaderHero";
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

    // SCROLL: rotação até ficar reta + descer
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
        ease: "none",
        scale: 1.2,
      });

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
          toggleActions: "play reverse play reverse",
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
          toggleActions: "play reverse play reverse",
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
