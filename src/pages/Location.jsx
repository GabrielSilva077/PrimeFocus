import React, { useRef } from "react";
import images from "../components/images";
import "../layout/location.css";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "../layout/home.css";

export default function Location() {
  // Ref para a seção
  const locationPaiRef = useRef(null);

  // Animação com useGSAP
  useGSAP(() => {
    const section = locationPaiRef.current;
    if (!section) return;

    // Cria a timeline com ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 90%",
        scrub: 1,
      },
    });

    tl.to(section, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    // 🚀 força recalcular o ScrollTrigger
    ScrollTrigger.refresh();

    // 🚀 garante que se já estiver visível (caso do clique na navbar),
    // a animação execute automaticamente
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      tl.play(0); // força a animação começar
    }

    // cleanup
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="center">
      <div
        ref={locationPaiRef}
        style={{ opacity: 0, transform: "translateY(50px)" }}
      >
        <h2 id="location">Nossa Localização</h2>

        <div className="imgs">
          <div className="imgTextCoff">
            <img src={images[23]} alt="" className="imgCoffeeShop" />
            <p className="imgP">
              Localizada no coração da cidade, a Golden Bean é o ponto ideal
              para apreciar um bom café e bons momentos.
            </p>
            <div className="ContatoDiv">
              <Link
                to="/Contact"
                onClick={() => {
                  setTimeout(() => {
                    const el = document.getElementById("paiContact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                <img src={images[31]} alt="" className="iconsContato" />
              </Link>
              <Link
                to="/Contact"
                onClick={() => {
                  setTimeout(() => {
                    const el = document.getElementById("paiContact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
              >
                <img src={images[30]} alt="" className="iconsContato" />
              </Link>
            </div>
          </div>
          <div className="imgTextMap">
            <div className="imgMap">
              <iframe
                title="Mapa Cristo Redentor"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.9542747622286!2d-43.21306212377686!3d-22.951911039487083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997fd5984aa13f%3A0x9dc984d7019502de!2sCristo%20Redentor!5e0!3m2!1spt-BR!2sbr!4v1760197193481!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
