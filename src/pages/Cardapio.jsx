import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/menu.css";
import Card from "../components/Card";
import "../layout/cardapio.css";

gsap.registerPlugin(ScrollTrigger);

export default function CardapioSection() {
  const [filter, setFilter] = useState("all"); // Estado do filtro

  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".paiMenu",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2 }
    );
  }, []);

  return (
    <>
      <section className="paiMenu">
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
            </p>
            <p
              className={filter === "bebidas" ? "active" : ""}
              onClick={() => setFilter("bebidas")}
            >
              Bebidas Especiais
            </p>
            <p
              className={filter === "doces" ? "active" : ""}
              onClick={() => setFilter("doces")}
            >
              Doces
            </p>
            <p
              className={filter === "salgados" ? "active" : ""}
              onClick={() => setFilter("salgados")}
            >
              Salgados
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
        <div>
          <Card filter={filter} animate={false} />
        </div>
      </section>
    </>
  );
}
