import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/menu.css";
import Card from "../components/Card";
import "../layout/cardapio.css";
import images from "../components/images";

gsap.registerPlugin(ScrollTrigger);

export default function CardapioSection() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);


  const [filter, setFilter] = useState("all"); // Estado do filtro

  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".titleMenu",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    );
    tl.fromTo(
      ".pMenu",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    tl.fromTo(
      ".mineNav",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4 }
    );
    tl.fromTo(
      ".cardCardapio",
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
  }, []);

  return (
    <>
      <section className="paiMenu" id="paiMenu">
        <div className="pfMenu">
          <h1 className="titleMenu">Nosso Cardápio</h1>
          <p className="pMenu">
            Descubra nossa seleção de cafés especiais e delícias para acompanhar
          </p>

          {/* Botões de filtro */}
          <div className="mineNav">
            <p
              className={`pI ${filter === "cafe" ? "active" : ""}`}
              onClick={() => setFilter("cafe")}
            >
              Café
              <img src={images[16]} alt="" className="icons" />
            </p>
            <p
              className={filter === "bebidas" ? "active" : ""}
              onClick={() => setFilter("bebidas")}
            >
              Bebidas Especiais
              <img src={images[17]} alt="" className="icons" />
            </p>
            <p
              className={filter === "doces" ? "active" : ""}
              onClick={() => setFilter("doces")}
            >
              Doces
              <img src={images[18]} alt="" className="icons" />
            </p>
            <p
              className={filter === "salgados" ? "active" : ""}
              onClick={() => setFilter("salgados")}
            >
              Salgados
              <img src={images[19]} alt="" className="icons" />
            </p>
            <p
              className={`pF ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Todos
            </p>
          </div>
        </div>

        {/* Componente Card recebendo filtro */}
        <div className="cardCardapio">
          <Card filter={filter} animate={false} />
        </div>
      </section>
    </>
  );
}
