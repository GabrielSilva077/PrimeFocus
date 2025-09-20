import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import jaqueta from "./assets/jaquetaH2.png";
import "./layout/home.css";
import "./layout/resp.css";
import Model3d from "./components/Modelo3D";
import { useInView } from "react-intersection-observer";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const nextContentRef = useRef(null);

  // observa a seção principal (já existente)
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  // observa apenas a "segundaTela" para rodar a animação sempre que ela entrar na viewport
  const { ref: nextInViewRef, inView: nextInView } = useInView({
    threshold: 0.35,
    triggerOnce: false, // IMPORTANT: false para rodar toda vez que entrar
  });

  useEffect(() => {
    // só inicia quando a seção principal entrar em view
    if (!inView) return;

    const ctx = gsap.context(() => {
      // garante estado inicial invisível / deslocado dos elementos da intro
      gsap.set([imgRef.current, ".textImg1", ".textImg2"], {
        opacity: 0,
        y: 200,
        scale: 1,
      });

      // timeline de entrada (intro)
      const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // jaqueta aparece primeiro
      introTl.to(imgRef.current, { y: 0, opacity: 1, duration: 0.7 });

      // texto "Just do" aparece logo em seguida
      introTl.to(".textImg1", { y: 0, opacity: 1, duration: 0.5 }, "-=0.2");

      // texto "It" aparece junto
      introTl.to(".textImg2", { y: 0, opacity: 1, duration: 0.5 }, "<");

      // quando a intro terminar, criamos o ScrollTrigger que controla o sumir do texto ao descer e o reaparecer ao subir
      introTl.eventCallback("onComplete", () => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "20%",
            scrub: 1, // permite animação bidirecional (descer e subir)
            pin: true,
          },
        });

        // Texto "Just do It" some ao descer e volta ao subir
        scrollTl.fromTo(
          ".justDoIt",
          { opacity: 1, y: 0 },
          { opacity: 0, y: -200, duration: 0.4, immediateRender: false },
          0
        );

        // Zoom na jaqueta (controlado pelo mesmo scroll)
        scrollTl.fromTo(
          imgRef.current,
          { scale: 1, transformOrigin: "50% 50%" },
          {
            scale: 10,
            transformOrigin: "50% 20%",
            duration: 1,
            immediateRender: false,
          },
          "<"
        );

        // overlay cobre a tela brevemente
        scrollTl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.1 },
          "-=0.3"
        );

        // próxima seção aparece enquanto rola (apenas entrada visual)
        // OBS: não animamos o movimento do texto aqui para evitar duplicidade
        scrollTl.fromTo(
          nextContentRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
          "-=0.6"
        );

        // overlay some
        scrollTl.to(overlayRef.current, { opacity: 0, duration: 1 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [inView]);

  // EFEITO NOVO: animação do texto "special edition" que roda toda vez que a "segundaTela" entra na viewport
  useEffect(() => {
    // garante que o ref exista
    if (!nextContentRef.current) return;

    // cria contexto scoped ao nextContentRef (seletores '.textTela2' vão selecionar só dentro desse bloco)
    const ctx = gsap.context(() => {
      if (nextInView) {
        // sempre garante ponto inicial antes de animar (para replay)
        gsap.set(".textTela2", { x: 0, opacity: 1 });

        // animação: mantém o texto no lugar por um instante e depois desloca para a esquerda
        const tl = gsap.timeline();

        tl.to(".aliText", { duration: 0.25, x: 0 }) // garante posição inicial visível
          .to(".aliText", {
            opacity: 1,
            y: -10,
            duration: 0.8,
            ease: "power2.out",
            delay: 1,
          })
          .to(".textTela2", {
            x: -450,
            duration: 0.8,
            ease: "power2.out",
            delay: 1,
          })
          .to(".img3d", {
            x: 50,
            duration: 0.8,
            ease: "power2.out",
            delay: 1,
          });
      } else {
        // quando sai da viewport, reseta a posição para permitir replay
        gsap.set(".textTela2", { x: 0 });
        gsap.set(".img3d", { x: 0 });
      }
    }, nextContentRef);

    return () => ctx.revert();
  }, [nextInView]);

  return (
    <div>
      <section
        ref={(el) => {
          containerRef.current = el;
          inViewRef(el); // conecta o useInView da seção principal
        }}
        className=""
      >
        <p className="textImg1 justDoIt">Just do</p>
        <img ref={imgRef} src={jaqueta} alt="Capuz" className="imgJaquetaH" />
        <p className="textImg2 justDoIt">It</p>

        <div
          ref={overlayRef}
          className="absolute top-0 left-0 w-full h-full bg-black opacity-0 pointer-events-none"
        />

        <div
          ref={(el) => {
            nextContentRef.current = el; // guarda o ref para gsap
            nextInViewRef(el); // conecta o useInView específico da segunda tela
          }}
          className="segundaTela"
          style={{ opacity: 0 }}
        >
          <div className="aliText">
            <p className="textTela2">special edition</p>
            <Model3d className="img3d" />
          </div>
        </div>
      </section>

      <section className="teste">
        <p>Segunda parte do site ✨</p>
      </section>
    </div>
  );
}
