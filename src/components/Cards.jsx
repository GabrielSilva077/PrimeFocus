import React from "react";
import { icons } from "../components/images";
import "../layout/card.css";

const services = [
  {
    icon: icons.Camera,
    title: "Ensaios Autorais",
    description:
      "Sessões fotográficas personalizadas que capturam sua essência única com sensibilidade artística.",
  },
  {
    icon: icons.Users,
    title: "Eventos & Celebrações",
    description:
      "Cobertura completa de casamentos, formaturas e eventos especiais com olhar editorial.",
  },
  {
    icon: icons.Award,
    title: "Fotografia Comercial",
    description:
      "Produção de imagens profissionais para marcas, produtos e campanhas publicitárias.",
  },
  {
    icon: icons.Sparkles,
    title: "Direção Criativa",
    description:
      "Consultoria e direção de arte para projetos fotográficos com conceito diferenciado.",
  },
];

export function ServicesSection() {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon-wrapper">
                <img
                  src={service.icon}
                  className="service-icon"
                  alt={service.title}
                />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
