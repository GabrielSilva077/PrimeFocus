import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import images from "../components/images";

import "../layout/card.css";

gsap.registerPlugin(ScrollTrigger);

const cafes = [
  {
    id: 1,
    nome: "Café Arábica",
    descricao: "Suave e aromático.",
    imagem: images[0],
    link: "#",
    preco: "R$ 20,00",
  },
  {
    id: 2,
    nome: "Café Robusta",
    descricao: "Encorpado e intenso.",
    imagem: images[1],
    link: "#",
    preco: "R$ 20,00",
  },
  {
    id: 3,
    nome: "Café Especial",
    descricao: "Sabor marcante.",
    imagem: images[2],
    link: "#",
    preco: "R$ 20,00",
  },
  {
    id: 4,
    nome: "Café Latte",
    descricao: "Café com leite cremoso.",
    imagem: images[5],
    link: "#",
    preco: "R$ 20,00",
  },
  {
    id: 5,
    nome: "Cappuccino",
    descricao: "Espuma de leite com cacau.",
    imagem: images[0],
    link: "#",
    preco: "R$ 20,00",
  },
  {
    id: 6,
    nome: "Espresso",
    descricao: "Concentrado e intenso.",
    imagem: images[5],
    link: "#",
    preco: "R$ 20,00",
  },
];

const specialDrinks = [
  {
    id: 1,
    nome: "Mocha",
    descricao: "Café com chocolate.",
    imagem: images[6],
    link: "#",
    preco: "R$ 10,00",
  },
  {
    id: 2,
    nome: "Frappuccino",
    descricao: "Café gelado com creme.",
    imagem: images[7],
    link: "#",
    preco: "R$ 10,00",
  },
  {
    id: 3,
    nome: "Chá Gelado",
    descricao: "Refrescante e leve.",
    imagem: images[8],
    link: "#",
    preco: "R$ 10,00",
  },
  {
    id: 4,
    nome: "Matcha Latte",
    descricao: "Chá verde cremoso.",
    imagem: images[9],
    link: "#",
    preco: "R$ 10,00",
  },
];

const cakes = [
  {
    id: 1,
    nome: "Bolo de Café",
    descricao: "Delicioso bolo de café.",
    imagem: images[3],
    link: "#",
    preco: "R$ 15,00",
  },
  {
    id: 2,
    nome: "Cheesecake",
    descricao: "Cremoso com base crocante.",
    imagem: images[10],
    link: "#",
    preco: "R$ 15,00",
  },
  {
    id: 3,
    nome: "Brownie",
    descricao: "Chocolate intenso e úmido.",
    imagem: images[11],
    link: "#",
    preco: "R$ 15,00",
  },
  {
    id: 4,
    nome: "Torta de Limão",
    descricao: "Acidez equilibrada com doce.",
    imagem: images[12],
    link: "#",
    preco: "R$ 15,00",
  },
];

const saltys = [
  {
    id: 1,
    nome: "Croissant",
    descricao: "Croissant fresco e macio.",
    imagem: images[12],
    link: "#",
    preco: "R$ 25,00",
  },
  {
    id: 2,
    nome: "Quiche",
    descricao: "Recheio cremoso com massa crocante.",
    imagem: images[13],
    link: "#",
    preco: "R$ 25,00",
  },
  {
    id: 3,
    nome: "Pão de Queijo",
    descricao: "Tradicional e quentinho.",
    imagem: images[14],
    link: "#",
    preco: "R$ 25,00",
  },
  {
    id: 4,
    nome: "Sanduíche Natural",
    descricao: "Leve e saudável.",
    imagem: images[15],
    link: "#",
    preco: "R$ 25,00",
  },
];

export default function Card({ filter, limit, animate = true }) {
  const cardsRef = useRef([]);

  useEffect(() => {
    if (!animate) return; // para não rodar
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".card",
          start: "top 80%",
          end: "bottom 90%",
          scrub: true,
        },
      })
      .fromTo(
        cardsRef.current,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, ease: "power1.out", stagger: 0.2 }
      );
  }, [filter, animate]);

  // Função para filtrar itens
  const getFilteredItems = () => {
    switch (filter) {
      case "cafe":
        return cafes;
      case "bebidas":
        return specialDrinks;
      case "doces":
        return cakes;
      case "salgados":
        return saltys;
      default:
        return [...cafes, ...specialDrinks, ...cakes, ...saltys];
    }
  };

  const displayedItems = limit
    ? getFilteredItems().slice(0, limit)
    : getFilteredItems();

  return (
    <section className="card">
      {displayedItems.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="cardDados"
          ref={(el) => (cardsRef.current[index] = el)}
        >
          <img src={item.imagem} alt={item.nome} className="cardsCoffe" />
          <div className="corCard-valores">
            <p className="nameCafe">{item.nome}</p>
            <p className="descCafe">{item.descricao}</p>
            <p className="preco">{item.preco}</p>
            <a href={item.link} className="btnCard">
              Ver Mais
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
