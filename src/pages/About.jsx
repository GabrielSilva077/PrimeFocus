import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/about.css";
import Sobre from "../assets/sobre.png";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  useEffect(() => {
    // Cria a timeline com ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sobrePai",
        start: "top 80%",
        end: "bottom 90%",
        scrub: 1,
      },
    });

    tl.to(".sobrePai", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    // 🚀 força recalcular o ScrollTrigger
    ScrollTrigger.refresh();

    // 🚀 garante que se já estiver visível (caso do clique na navbar),
    // a animação execute automaticamente
    const section = document.querySelector(".sobrePai");
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        tl.play(0); // força a animação começar
      }
    }

    // cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      className="sobrePai"
      id="About"
      style={{ opacity: 0, transform: "translateY(50px)" }}
    >
      <div className="alinhar">
        <div className="titleImg">
          <img src={Sobre} alt="sobre" className="imgSobre" />
        </div>
        <div className="text">
          <h2 className="titleAbout">Quem somos</h2>
          <p className="textAboutP">
            Fundada em 2010, a Café Aroma nasceu da paixão por café de qualidade
            e do desejo de criar um espaço acolhedor onde as pessoas pudessem
            desfrutar de momentos especiais. Trabalhamos com grãos selecionados
            das melhores regiões produtoras do Brasil, torrados artesanalmente
            para garantir o sabor e aroma perfeitos em cada xícara.
          </p>
        </div>
      </div>
    </section>
  );
}
