import { useEffect, useState } from "react";
import { fetchSiteContent } from "../api";
import "../layout/card.css";

import icon6 from "../assets/cameraicon.png";
import icon7 from "../assets/user.png";
import icon8 from "../assets/award.png";
import icon9 from "../assets/star.png";

export function ServicesSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // tempo mínimo de loading (evita piscadas)
  const MIN_LOADING_TIME = 600;

  useEffect(() => {
    async function loadServices() {
      const start = Date.now(); // marca o tempo de início

      try {
        const data = await fetchSiteContent();
        const servicos = data.servicos || [];

        const localImagesMap = new Map([
          [6, icon6],
          [7, icon7],
          [8, icon8],
          [9, icon9],
        ]);

        const ids = [6, 7, 8, 9];

        const servComIcone = servicos.map((s, idx) => ({
          ...s,
          icone: localImagesMap.get(ids[idx]) || null,
        }));

        setServices(servComIcone);

        // garante tempo mínimo de loading
        const elapsed = Date.now() - start;
        const wait = Math.max(0, MIN_LOADING_TIME - elapsed);

        setTimeout(() => setLoading(false), wait);
      } catch (e) {
        console.error("Erro ao carregar serviços:", e);
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <section className="services-section">
      <div className="services-container">
        {/* ====== LOADING ====== */}
        {loading && (
          <div className="w-full flex justify-center items-center py-20">
            <div className="loader-spin"></div>
          </div>
        )}

        {/* ====== GRID APARECE SÓ QUANDO TERMINAR ====== */}
        {!loading && (
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
        )}
      </div>
    </section>
  );
}
