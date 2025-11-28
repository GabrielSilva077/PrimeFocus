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

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, Instagram } from "lucide-react";
// import "../../layout/contact.css";
// import { BudgetRequestModal } from "../../components/modals/BudgetRequestModal";

// export default function Contact({ closeMenu }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

//   return (
//     <>
//       <section className="sectionContact">
//         <h1 className="titleContact">Vamos Criar Juntos?</h1>
//         <p className="subTitleContact">
//           Cada projeto é uma nova oportunidade de criar algo extraordinário.
//         </p>
//         <p className="subTitleContact">
//           Entre em contato e vamos transformar sua visão em realidade.
//         </p>

//         {/* Botão que abre a modal */}
//         <button
//           className="fechar"
//           onClick={(e) => {
//             const rect = e.currentTarget.getBoundingClientRect();
//             setModalPosition({ x: rect.left + rect.width / 2, y: rect.bottom });
//             setIsModalOpen(true);
//           }}
//         >
//           Solicitar Orçamento
//         </button>
//       </section>

//       {/* Contact Info */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//         className="flex flex-col md:flex-row items-center justify-center gap-8 text-brown-light"
//       >
//         <a href="mailto:pivete290@gmail.com" className="iconsText">
//           <div>
//             <Mail className="w-5 h-5 icons" strokeWidth={1.5} />
//             <span className="font-sans text-sm tracking-wide">
//               pivete290@gmail.com
//             </span>
//           </div>
//         </a>

//         <a
//           href="https://wa.me/5511999999999"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="iconsText"
//         >
//           <div>
//             <Phone className="w-5 h-5 icons" strokeWidth={1.5} />
//             <span className="font-sans text-sm tracking-wide">
//               +55 11 99999-9999
//             </span>
//           </div>
//         </a>

//         <a
//           href="https://instagram.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="iconsText"
//         >
//           <div>
//             <Instagram className="w-5 h-5 icons" strokeWidth={1.5} />
//             <span className="font-sans text-sm tracking-wide">@fotografo</span>
//           </div>
//         </a>
//       </motion.div>

//       {/* Modal */}
//       <BudgetRequestModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         clickPosition={modalPosition}
//       />
//     </>
//   );
// }
