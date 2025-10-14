import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a visibilidade da modal
  const [selectedItem, setSelectedItem] = useState(null); // Estado para armazenar o item selecionado

  // Função para abrir a modal com o item clicado
  const handleOpenModal = (item, event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    setSelectedItem({
      ...item,
      position: {
        top: cardRect.top + scrollTop + cardRect.height / 2 - 500,
        left: cardRect.left + cardRect.width / 2,
      },
    });

    setIsModalOpen(true);
  };

  // Função para fechar a modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // 🔎 Filtragem de itens (mantida igual)
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

  // 🎬 Nova animação estilo cinematográfico (mantida igual)
  useGSAP(() => {
    if (!animate) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".card",
        start: "top 80%",
        end: "bottom 10%",
        scrub: 1,
      },
    });

    tl.fromTo(
      cardsRef.current,
      { yPercent: 40, opacity: 0, scale: 0.95 },
      {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.15,
      }
    ).to(cardsRef.current, {
      opacity: 0,
      yPercent: -10,
      ease: "power2.inOut",
      duration: 1,
      stagger: 0.1,
    });
  }, [filter, animate]);

  return (
    <section className="card">
      {displayedItems.map((item, index) => (
        <div
          key={`${item.id}-${index}`}
          className="cardDados"
          ref={(el) => (cardsRef.current[index] = el)}
          onClick={(e) => handleOpenModal(item, e)}
        >
          <img src={item.imagem} alt={item.nome} className="cardsCoffe" />
          <div className="corCard-valores">
            <p className="nameCafe">{item.nome}</p>
            <p className="preco">{item.preco}</p>
            {/* Modificado: Botão em vez de link, para abrir a modal */}
            <button className="btnCard" onClick={() => handleOpenModal(item)}>
              Ver Mais
            </button>
          </div>
        </div>
      ))}

      {/* Modal: Renderizada condicionalmente */}
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content"
            style={{
              top: selectedItem.position.top + "px",
              left: selectedItem.position.left + "px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedItem.nome}</h2>
            <img
              src={selectedItem.imagem}
              alt={selectedItem.nome}
              className="modal-image"
            />
            <p>
              <strong className="desc">Descrição:</strong>{" "}
              {selectedItem.descricao}
            </p>
            <p>
              <strong className="preco">Preço:</strong> {selectedItem.preco}
            </p>
            <button onClick={handleCloseModal} className="btnClose">
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
