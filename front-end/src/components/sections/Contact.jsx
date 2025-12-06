// import React, { useState, useEffect } from "react";
// import "../../layout/contact.css";
// import { icons } from "../../components/images";
// import { fetchSiteContent } from "../../api";
// import { BudgetRequestModal } from "../../components/modals/BudgetRequestModal";

// export default function Contact() {
//   const [contactData, setContactData] = useState({ links: [] });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

// useEffect(() => {
//   (async () => {
//     const data = await fetchSiteContent();
//     setContactData({
//       ...data.contact,
//       links: data.contact?.links || [], // garante que seja array
//     });
//   })();
// }, []);


//   if (!contactData) return null; // loading...

//   return (
//     <>
//       <section className="sectionContact">
//         <h1 className="titleContact">{contactData.title}</h1>

//         <p className="subTitleContact">{contactData.subtitle1}</p>
//         <p className="subTitleContact">{contactData.subtitle2}</p>

//         {/* BOTÃO → MODAL */}
//         <button
//           className="fechar"
//           onClick={(e) => {
//             const rect = e.currentTarget.getBoundingClientRect();
//             setModalPosition({
//               x: rect.left + rect.width / 2,
//               y: rect.bottom,
//             });
//             setIsModalOpen(true);
//           }}
//         >
//           {contactData.button}
//         </button>
//       </section>

//       <div className="divIcons">
//         {contactData.links.map((item, index) => (
//           <a key={index} href={item.url} target="_blank">
//             <img src={icons[item.icon]} alt="" className="icons" />
//             {item.title}
//           </a>
//         ))}
//       </div>

//       <BudgetRequestModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         position={modalPosition}
//       />
//     </>
//   );
// }







import React, { useState } from "react";
import "../../layout/contact.css";
import { icons } from "../../components/images";
import { useLocation } from "react-router-dom";
import { BudgetRequestModal } from "../../components/modals/BudgetRequestModal";

const logos = [
  {
    icon: icons.Email,
    title: "contato@fotografo.com",
    link: "mailto:pivete290@gmail.com",
  },
  {
    icon: icons.Tel,
    title: "+55 11 99999-9999",
    link: "https://wa.me/5511999999999",
  },
  {
    icon: icons.Insta,
    title: "fotografo@fotografo",
    link: "https://www.instagram.com/",
  },
];

export default function Contact({ closeMenu }) {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      <section className="sectionContact">
        <h1 className="titleContact">Vamos Criar Juntos?</h1>
        <p className="subTitleContact">
          Cada projeto é uma nova oportunidade de criar algo extraordinário.
        </p>
        <p className="subTitleContact">
          Entre em contato e vamos transformar sua visão em realidade.
        </p>

        {/* Botão que abre a modal */}
        <button
          className="fechar"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setModalPosition({ x: rect.left + rect.width / 2, y: rect.bottom });
            setIsModalOpen(true);
          }}
        >
          Solicitar Orçamento
        </button>
      </section>

      <div className="divIcons">
        <a href="mailto:pivete290@gmail.com" target="_blank">
          <img src={icons.Email} alt="" className="icons"/>
          contato@fotografo.com
        </a>
        <a href="https://wa.me/5511999999999" target="_blank">
          <img src={icons.Tel} alt="" className="icons"/>
          +55 11 99999-9999
        </a>
        <a href="https://instagram.com" target="_blank">
          <img src={icons.Insta} alt="" className="icons"/>
          Instagram
        </a>
      </div>

      {/* Modal */}
      <BudgetRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        position={modalPosition}
      />
    </>
  );
}
