import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img from "../assets/cafe.png";
import Img2 from "../assets/cafe2.png";
import Img3 from "../assets/bolo.png";
import "../layout/card.css";

gsap.registerPlugin(ScrollTrigger);

const cafes = [
  {
    id: 1,
    nome: "Café Arábica",
    descricao: "Suave e aromático.",
    imagem: Img,
    link: "#",
  },
  {
    id: 2,
    nome: "Café Robusta",
    descricao: "Encorpado e intenso.",
    imagem: Img2,
    link: "#",
  },
  {
    id: 3,
    nome: "Bolo de Café",
    descricao: "Delicioso bolo de café.",
    imagem: Img3,
    link: "#",
  },
  {
    id: 4,
    nome: "Café Especial",
    descricao: "Sabor marcante.",
    imagem: Img2,
    link: "#",
  },
  {
    id: 5,
    nome: "Café Especial",
    descricao: "Sabor marcante.",
    imagem: Img2,
    link: "#",
  },
];

export default function CardList({ limit }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".card",
          start: "top 80%",
          end: "bottom 90%",
          scrub: 1,
        },
      })
      .fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "power1.out",
          stagger: 0.2,
        }
      );
  }, []);

  const displayedCafes = limit ? cafes.slice(0, limit) : cafes;

  return (
    <section className="card">
      {displayedCafes.map((cafe, index) => (
        <div
          key={cafe.id}
          className="cardDados"
          ref={(el) => (cardsRef.current[index] = el)}
        >
          <img src={cafe.imagem} alt={cafe.nome} className="cardsCoffe" />
          <p className="nameCafe">{cafe.nome}</p>
          <p className="descCafe">{cafe.descricao}</p>
          <a href={cafe.link} className="btnCard">
            Ver Mais
          </a>
        </div>
      ))}
    </section>
  );
}
