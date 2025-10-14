import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import images from "../components/images";
import { useGSAP } from "@gsap/react";
import "../layout/contact.css";

const Contact = () => {

  const mineNavRef = useRef(null);
  const cardCardapioRef = useRef(null);

  // Animação com useGSAP
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
        mineNavRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
      .fromTo(
        cardCardapioRef.current,
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      );
  }, []);

  return (
    <section id="paiContact">
      <div className="alinhamento">
        <h1 className="titleContact" ref={mineNavRef}>Entre em Contato</h1>

        <div className="divForm" ref={cardCardapioRef}>
          <img src={images[23]} alt="" className="imgContact" />
          <form action="" className="form">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <textarea placeholder="Message" className="message"></textarea>
            <input
              type="button"
              value="Enviar Mensagem"
              className="btnEnviar"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
