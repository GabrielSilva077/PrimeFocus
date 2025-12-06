import React from "react";
import { ServicesSection } from "../../components/Cards";

export default function Services() {
  return (
    <section className="">
      <div className="services-header">
        <h2 className="services-title">Serviços</h2>
        <p className="services-subtitle">
          Soluções fotográficas completas com excelência técnica e visão
          artística
        </p>
      </div>
      <div>
        <ServicesSection />
      </div>
    </section>
  );
}
