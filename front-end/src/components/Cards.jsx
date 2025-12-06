import { useEffect, useState } from "react";
import { fetchSiteContent } from "../api";
import "../layout/card.css";

import icon6 from "../assets/cameraicon.png";
import icon7 from "../assets/user.png";
import icon8 from "../assets/award.png";
import icon9 from "../assets/star.png";

export function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSiteContent();

        const servicos = data.servicos || [];

        const localImagesMap = new Map([
          [6, icon6],
          [7, icon7],
          [8, icon8],
          [9, icon9],
        ]);

        // ids que você originalmente usava para buscar no portfolio
        const ids = [6, 7, 8, 9];

        const servComIcone = servicos.map((s, idx) => ({
          ...s,
          // Pega a imagem local correspondente ao id. Se não houver, fica null e renderiza o placeholder.
          icone: localImagesMap.get(ids[idx]) || null,
        }));

        setServices(servComIcone);
      } catch (e) {
        console.error("Erro ao carregar serviços:", e);
      }
    })();
  }, []);

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon-wrapper">
                {service.icone ? (
                  <img
                    src={service.icone}
                    className="service-icon"
                    alt={service.titulo}
                  />
                ) : (
                  <div className="service-placeholder" />
                )}
              </div>
              <h3 className="service-title">{service.titulo}</h3>
              <p className="service-description">{service.descricao}</p>
              <div className="service-line"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
