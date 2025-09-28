import { useEffect, useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../layout/menu.css";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import Card from "../components/Card";

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".paiMenu",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2 }
    )
      .fromTo(
        ".bestSellers",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        ".cards",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <section className="paiMenu">
        <div className="cards">
          <h2 className="bestSellers">Best Sellers</h2>
          <Card />
        </div>

        <div className="VerMais">
          <a href="">Ver Mais</a>
        </div>
      </section>
    </>
  );
}
