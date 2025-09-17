// import { useLayoutEffect, useRef } from "react";
// import "./App.css";
// import relogioPretoImg from "./assets/relogio-preto.svg";
// import relogioRoseImg from "./assets/relogio-rose.svg";
// import relogioUltraImg from "./assets/relogio-ultra.svg";
// import relogio2 from "./assets/relogio2.svg";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// function App() {
//   const el = useRef();
//   const tl = useRef();

//   useLayoutEffect(() => {
//     // gsap.registerPlugin(ScrollTrigger);
//     // gsap.to(".relogio", {
//     //   x: 0,
//     //   opacity: 1,
//     //   rotate: "0deg",
//     //   scrollTrigger:{
//     //     trigger: ".items",
//     //     //markers: true,
//     //     start: "top 620px",
//     //     end: "bottom 700px",
//     //     scrub: 1.5
//     //   }
//     // })

//     // gsap.to(".relogio", {
//     //   x: 0,
//     //   opacity: 1,
//     //   rotate: "0deg",
//     //   duration: 1.5, // tempo da animação
//     //   ease: "power2.out",
//     // });

//     gsap.registerPlugin(ScrollTrigger);

//     let tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".items",
//         // markers: true, // ativa para visualizar o início e fim
//         start: "top 620px",
//         end: "bottom 700px",
//         scrub: 1.5,
//       },
//     });

//     // Etapa 1 → vai para posição X
//     tl.to(".relogio", {
//       x: 400, // muda apenas o eixo X
//       y: 100,
//       duration: 1,
//     });

//     // Etapa 2 → vai para posição Y
//     tl.to(".relogio", {
//       x: -350,
//       y: 450, // agora desce no eixo Y
//       duration: 3,
//     });

//     // Etapa 3 → vai para posição Z
//     tl.to(".relogio", {
//       x: 200,
//       y: 600, // posição final
//       duration: 1,
//     });

//     return () => {
//       gsap.killTweensOf(".relogio");
//     };
//   }, []);

//   useLayoutEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     const ctx = gsap.context(() => {
//       tl.current = gsap
//         .timeline({
//           scrollTrigger: {
//             trigger: ".models-item",
//             scrub: true,
//             // markers: true,
//             start: "top 800px",
//             end: "bottom 900px",
//           },
//         })
//         .fromTo(
//           "#model-1",
//           {
//             opacity: 0,
//             y: 160,
//           },
//           {
//             opacity: 1,
//             y: 0,
//           }
//         )
//         .fromTo(
//           "#model-2",
//           {
//             opacity: 0,
//             y: 160,
//           },
//           {
//             opacity: 1,
//             y: 0,
//           }
//         )
//         .fromTo(
//           "#model-3",
//           {
//             opacity: 0,
//             y: 160,
//           },
//           {
//             opacity: 1,
//             y: 0,
//           }
//         );
//     }, el);

//     return () => {
//       gsap.killTweensOf(".models-item");
//     };
//   }, []);

//   return (
//     <div className="container">
//       <div className="area-model">
//         <h1>ITEM 1</h1>
//       </div>
//       <div className="area-model">
//         <h1>ITEM 2</h1>
//       </div>

//       <section className="items">
//         <div className="items-content">
//           <img className="relogio" src={relogio2} alt="Relogio AppleWatch" />
//         </div>
//       </section>

//       <section className="models-container">
//         <h2 className="title">Qual é o Apple Watch ideal para você?</h2>

//         <div className="models-content" ref={el}>
//           <div className="models-item" id="model-1">
//             <img src={relogioPretoImg} alt="Relogio Preto" />
//             <span className="models-tag">Novo</span>
//             <h4 className="models-title">Apple Watch Series 8</h4>
//             <p className="models-description">
//               A partir de <strong>R$ 5.299</strong>
//             </p>
//           </div>

//           <div className="models-item" id="model-2">
//             <img src={relogioRoseImg} alt="Relogio Rose" />
//             <span className="models-tag">Novo</span>
//             <h4 className="models-title">Apple Watch SE</h4>
//             <p className="models-description">
//               A partir de <strong>R$ 3.399</strong>
//             </p>
//           </div>

//           <div className="models-item" id="model-3">
//             <img src={relogioUltraImg} alt="Relogio Ultra" />
//             <span className="models-tag">Novo</span>
//             <h4 className="models-title">Apple Watch Ultra</h4>
//             <p className="models-description">
//               A partir de <strong>R$ 10.299</strong>
//             </p>
//           </div>
//         </div>
//       </section>

//       <div className="area-model">
//         <h1>ITEM 3</h1>
//       </div>

//       <div className="area-model">
//         <h1>ITEM 4</h1>
//       </div>
//     </div>
//   );
// }

// export default App;









// import { useLayoutEffect, useRef } from "react";
// import "./App.css";
// import relogioPretoImg from "./assets/relogio-preto.svg";
// import relogioRoseImg from "./assets/relogio-rose.svg";
// import relogioUltraImg from "./assets/relogio-ultra.svg";
// import relogio2 from "./assets/nike.png";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// function App() {
//   const el = useRef();
//   const tl = useRef();

//   useLayoutEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     // =============================
//     // TESTES DO GSAP (1 a 29)
//     // =============================

//     // 1 - gsap.effects
//     // gsap.registerEffect({
//     //   name: "fadeIn",
//     //   effect: (targets, config) => gsap.to(targets, { opacity: 1, duration: config.duration }),
//     //   defaults: { duration: 1 },
//     // });
//     // gsap.effects.fadeIn(".relogio");

//     // 2 - gsap.globalTimeline
//     // console.log(gsap.globalTimeline);

//     // 3 - gsap.ticker
//     // gsap.ticker.add(() => console.log("rodando em cada frame!"));

//     // 4 - gsap.utils
//     // let random = gsap.utils.random(0, 100, 5);
//     // console.log(random());

//     // 5 - gsap.version
//     // console.log(gsap.version);

//     // 6 - gsap.config
//     // gsap.config({ nullTargetWarn: false });

//     // 7 - gsap.context
//     // const ctx = gsap.context(() => {
//     //   gsap.to(".relogio", { x: 100 });
//     // }, el);
//     // ctx.revert();

//     // 8 - gsap.defaults
//     // gsap.defaults({ duration: 2, ease: "power1.inOut" });
//     // gsap.to(".relogio", { x: 200 });

//     // 9 - gsap.delayedCall
//     // gsap.delayedCall(2, () => console.log("2 segundos depois..."));

//     // 10 - gsap.exportRoot
//     // let root = gsap.exportRoot();
//     // root.pause();

//     // 11 - gsap.from
//     // gsap.from(".relogio", { opacity: 0, y: -100, duration: 1 });

//     // 12 - gsap.fromTo
//     //deslisa do lado esquerdo para a direita
//     // gsap.fromTo(".relogio", { y: 200, opacity: 0 }, { y: -100, duration: 1, opacity: 1});

//     // 13 - gsap.getById
//     // gsap.to(".relogio", { x: 100, id: "move" });
//     // console.log(gsap.getById("move"));

//     // 14 - gsap.getProperty
//     // console.log(gsap.getProperty(".relogio", "x"));

//     // 15 - gsap.getTweensOf
//     // console.log(gsap.getTweensOf(".relogio"));

//     // 16 - gsap.isTweening
//     // console.log(gsap.isTweening(".relogio"));

//     // 17 - gsap.killTweensOf
//     // gsap.killTweensOf(".relogio");

//     // 18 - gsap.matchMedia
//     // let mm = gsap.matchMedia();
//     // mm.add("(max-width: 600px)", () => {
//     //   gsap.to(".relogio", { x: 50 });
//     // });

//     // 19 - gsap.matchMediaRefresh
//     // gsap.matchMediaRefresh();

//     // 20 - gsap.parseEase
//     // let easeFunc = gsap.parseEase("power2.inOut");
//     // console.log(easeFunc(0.5));

//     // 21 - gsap.quickSetter
//     // let setX = gsap.quickSetter(".relogio", "x", "px");
//     // setX(200);

//     // 22 - gsap.quickTo
//     // let moveX = gsap.quickTo(".relogio", "x", { duration: 0.5 });
//     // moveX(300);

//     // 23 - gsap.registerEase
//     // gsap.registerEase("myEase", (p) => p * p);
//     // gsap.to(".relogio", { x: 200, ease: "myEase" });

//     // 24 - gsap.registerEffect
//     // gsap.registerEffect({
//     //   name: "spin",
//     //   effect: (targets, config) =>
//     //     gsap.to(targets, { rotation: 360, duration: config.duration }),
//     //   defaults: { duration: 1 },
//     // });
//     // gsap.effects.spin(".relogio");

//     // 25 - gsap.registerPlugin
//     // gsap.registerPlugin(ScrollTrigger);
//     // gsap.to(".relogio", {
//     //   x: 200,
//     //   scrollTrigger: { trigger: ".items", start: "top 80%" },
//     // });

//     // 26 - gsap.set
//     // gsap.set(".relogio", { x: 100, opacity: 0.5 });

//     // 27 - gsap.timeline
//     // let timeline = gsap.timeline();
//     // timeline.to(".relogio", { x: 200 }).to(".relogio", { y: -100 });

//     // 28 - gsap.to
//     // gsap.to(".relogio", { x: 200, duration: 1 });

//     // 29 - gsap.updateRoot
//     // gsap.updateRoot(gsap.globalTimeline.time());

// gsap.registerPlugin(ScrollTrigger);

// let tl = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".items",
//     start: "top top",
//     end: "top+=1400", // altura total do scroll para todas as etapas
//     scrub: true,
//     markers: true
//   }
// });

// // Etapa 1 → do centro para canto inferior esquerdo
// tl.to(".relogio", { x: "-30vw", y: "30vh", duration: 1 });

// // Etapa 2 → move para canto inferior central
// tl.to(".relogio", { x: "0vw", y: "50vh", duration: 1 });

// // Etapa 3 → move para canto inferior direito
// tl.to(".relogio", { x: "30vw", y: "30vh", duration: 1 });



//   }, []);

//   return (
//     <div className="container">
//       {/* <div className="area-model">
//         <h1>ITEM 1</h1>
//       </div>
//       <div className="area-model">
//         <h1>ITEM 2</h1>
//       </div> */}

//       <section className="items">
//         <div className="items-content">
//           <img className="relogio" src={relogio2} alt="Relogio AppleWatch" />
//         </div>
//       </section>

//       {/* <section className="models-container">
//         <h2 className="title">Qual é o Apple Watch ideal para você?</h2>

//         <div className="models-content" ref={el}>
//           <div className="models-item" id="model-1">
//             <img src={relogioPretoImg} alt="Relogio Preto" />
//             <span className="models-tag">Novo</span>
//             <h4 className="models-title">Apple Watch Series 8</h4>
//             <p className="models-description">
//               A partir de <strong>R$ 5.299</strong>
//             </p>
//           </div>

//           <div className="models-item" id="model-2">
//             <img src={relogioRoseImg} alt="Relogio Rose" />
//             <span className="models-tag">Novo</span>
//             <h4 className="models-title">Apple Watch SE</h4>
//             <p className="models-description">
//               A partir de <strong>R$ 3.399</strong>
//             </p>
//           </div>

//           <div className="models-item" id="model-3">
//             <img src={relogioUltraImg} alt="Relogio Ultra" />
//             <span className="models-tag">Novo</span>
//             <h4 className="models-title">Apple Watch Ultra</h4>
//             <p className="models-description">
//               A partir de <strong>R$ 10.299</strong>
//             </p>
//           </div>
//         </div>
//       </section> */}

//       <div className="area-model">
//         <h1>ITEM 3</h1>
//       </div>

//       <div className="area-model">
//         <h1>ITEM 4</h1>
//       </div>
//       <div className="area-model">
//         <h1>ITEM 3</h1>
//       </div>

//       <div className="area-model">
//         <h1>ITEM 4</h1>
//       </div>
//       <div className="area-model">
//         <h1>ITEM 3</h1>
//       </div>

//       <div className="area-model">
//         <h1>ITEM 4</h1>
//       </div>
//     </div>
//   );
// }

// export default App;
