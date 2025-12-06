import React from "react";

export default function Resultados({ PercentCounter }) {
  const resultados = [
    {
      titulo: "Clientes que contratam novamente",
      valor: 82,
      texto: "Qualidade e atendimento geram fidelização.",
      showPercent: true,
    },
    {
      titulo: "Aumento do impacto visual nas redes",
      valor: 47,
      texto: "Fotos profissionais valorizam marcas e perfis.",
      showPercent: true,
    },
    {
      titulo: "De experiência na fotografia",
      valor: 12,
      texto: "Especialista em retratos, ensaios e eventos.",
      showPercent: false,
    },
  ];

  return (
    <section className="Resultados">
      {resultados.map((item, index) => (
        <div className="percent" key={index}>
          <p className="percentH1">{item.titulo}</p>
          <p className="linhaResult"></p>

          <div className="numText">
            <PercentCounter
              finalValue={item.valor}
              duration={2000}
              showPercent={item.showPercent}
            />
            <p className="pText">{item.texto}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
