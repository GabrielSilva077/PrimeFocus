// File: src/pages/sections/SobreMim.jsx
import React from "react";

export default function SobreMim({ imgSobre }) {
  return (
    <section className="SobreMim">
      <div>
        <h2>Sobre Mim</h2>
        <p>
          Há mais de uma década, dedico-me à arte de contar histórias através da
          fotografia. Cada imagem é uma narrativa visual cuidadosamente
          construída, onde luz, composição e emoção se encontram. Meu trabalho é
          guiado pela busca da autenticidade e pela valorização dos pequenos
          detalhes que tornam cada momento único e irrepetível. Fotografia é
          mais que técnica — é sensibilidade, é arte, é eternizar o efêmero.
        </p>
      </div>
      <div className="imgSobreMinDiv">
        <img src={imgSobre} alt="Foto Sobre Mim" className="imgSobre" />
      </div>
    </section>
  );
}
