// import { useLayoutEffect, useRef } from "react";
// import "./App.css";
// import relogioPretoImg from "./assets/relogio-preto.svg";
// import relogioRoseImg from "./assets/relogio-rose.svg";
// import relogioUltraImg from "./assets/relogio-ultra.svg";
// import relogio2 from "./assets/nike.png";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import tenis from "./assets/nike.png";

// function Teste() {
//   useLayoutEffect(() => {
//     let tl = gsap.timeline();

//     tl.fromTo(
//       ".tenisNike",
//       { y: 200, opacity: 0 },
//       { y: -100, opacity: 1, duration: 1 }
//     )
//       .fromTo(
//         ".sombra",
//         { y: 200, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "-=0.9"
//       )
//       .fromTo(
//         ".centr",
//         { y: 200, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "-=0.5"
//       )
//       .fromTo(
//         ".esque",
//         { y: 200, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "-=0.5"
//       )
//       .fromTo(
//         ".dire",
//         { y: 200, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "-=0.5"
//       )
//       .fromTo(
//         ".name",
//         { y: 200, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "-=0.1"
//       )
//       .fromTo(
//         ".planoDeFundo",
//         { y: 200, opacity: 0 },
//         { y: 0, opacity: 1, duration: 1 },
//         "-=0.1"
//       )
//       // ANIMAÇÃO DE FLUTUAR DO TÊNIS
//       .to(".tenisNike", {
//         y: "=20",
//         duration: 2,
//         yoyo: true,
//         repeat: -1,
//         ease: "sine.inOut",
//       })
//       // ANIMAÇÃO DE FLUTUAR DA SOMBRA
//       .to(
//         ".sombra",
//         {
//           scale: 1.2, // diminui a sombra
//           duration: 2,
//           yoyo: true,
//           repeat: -1,
//           ease: "sine.inOut",
//         },
//         "<" // "<" significa iniciar junto com a animação anterior do tênis
//       );
//   }, []);

//   return (
//     <>
//       <div className="container">
//         <div className="name">
//           <p>Nike</p>
//         </div>
//         <div className="alinhar">
//           <div className="divNike">
//             <img src={tenis} alt="" className="tenisNike" />
//           </div>
//           <div className="bloco">
//             <div className="sombra"></div>
//             <div className="centr"></div>
//             <div className="coluna">
//               <div className="esque"></div>
//               <div className="dire"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* <div className="planoDeFundo"></div> */}
//     </>
//   );
// }

// export default Teste;
