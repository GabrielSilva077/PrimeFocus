import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/about.css";
import Sobre from "../assets/sobre.png";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  useEffect(() => {
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".sobrePai",
          start: "top 80%",
          end: "bottom 90%",
          scrub: 10,
        },
      })
      .to(".sobrePai", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      });

    // tl.from(".titleAbout", {
    //   x: -100,
    //   y: 100,
    // })
    // .from(".titleAbout", {
    //   x: 100,
    //   y: 100,
    // });
  }, []);

  return (
    <>
      <section className="sobrePai">
        <div className="alinhar">
          <div className="titleImg">
            <img src={Sobre} alt="" className="imgSobre" />
          </div>
          <div className="text">
            <h2 className="titleAbout">Quem somos</h2>
            <p className="textAboutP">
              Fundada em 2010, a Café Aroma nasceu da paixão por café de
              qualidade e do desejo de criar um espaço acolhedor onde as pessoas
              pudessem desfrutar de momentos especiais. Trabalhamos com grãos
              selecionados das melhores regiões produtoras do Brasil, torrados
              artesanalmente para garantir o sabor e aroma perfeitos em cada
              xícara.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
