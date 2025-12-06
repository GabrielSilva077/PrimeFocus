// import { useEffect, useState } from "react";
// import { fetchSiteContent } from "../../api";
// import Perfil from "../../assets/planodeFundo.png";

// export default function SobreMim() {
//   const [content, setContent] = useState({
//     titulo: "Sobre Mim",
//     parags: [],
//   });

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await fetchSiteContent();

//         if (data.about) {
//           setContent({
//             titulo: data.about.title || "Sobre Mim",
//             parags: data.about.paragraphs || [],
//           });
//         }
//       } catch (e) {
//         console.error("Erro ao buscar conteúdo:", e);
//       }
//     })();
//   }, []);

//   return (
//     <section className="SobreMim">
//       <div>
//         <h2>{content.titulo}</h2>

//         {content.parags.map((p, i) => (
//           <p key={i}>{p}</p>
//         ))}
//       </div>

//       <div className="imgSobreMinDiv">
//         <img src={Perfil} alt="" />
//       </div>
//     </section>
//   );
// }

// // de cima sem banco e o de baixo com o banco




// import { useEffect, useState } from "react";
// import { fetchSiteContent } from "../../api";

// export default function SobreMim() {
//   const [content, setContent] = useState({
//     titulo: "Sobre Mim",
//     texto: "",
//     imagem: "",
//   });

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await fetchSiteContent();

//         // Buscar a imagem pelo ID no portfolio
//         const imagemSobreMim = data.portfolio?.find((item) => item.id === 4);

//         setContent({
//           titulo: data.sobreMim?.titulo || "Sobre Mim",
//           texto: data.sobreMim?.texto || "",
//           imagem: imagemSobreMim?.url || "", // imagem do banco
//         });

//       } catch (e) {
//         console.error("Erro ao buscar conteúdo:", e);
//       }
//     })();
//   }, []);

//   return (
//     <section className="SobreMim">
//       <div>
//         <h2>{content.titulo}</h2>
//         <p>{content.texto}</p>
//       </div>

//       <div className="imgSobreMinDiv">
//         <img
//           src={content.imagem}
//           alt="Sobre Mim"
//           className="imgSobreMin"
//         />
//       </div>
//     </section>
//   );
// }




// codigo antigo


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
