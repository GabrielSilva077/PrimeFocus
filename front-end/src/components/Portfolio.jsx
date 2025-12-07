import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../layout/portfolio.css";

export default function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([]);

  // DEFINIÇÃO DO LAYOUT ORIGINAL
  const layoutSpans = [
    "md:col-span-2 md:row-span-2", // imagem 1
    "md:col-span-1 md:row-span-1", // imagem 2
    "md:col-span-1 md:row-span-1", // imagem 3
    "md:col-span-1 md:row-span-1", // imagem 4
    "md:col-span-2 md:row-span-1", // imagem 5
  ];

  // BUSCAR IMAGENS DO BANCO
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("https://primefocus.onrender.com/portfolio");
        const data = await response.json();

        if (data.success) {
          // pega apenas 5 imagens
          const limitedImgs = data.data.slice(0, 5);

          // adiciona span fixo igual ao design antigo
          const mapped = limitedImgs.map((img, index) => ({
            ...img,
            span: layoutSpans[index] || "md:col-span-1 md:row-span-1",
          }));

          setGalleryImages(mapped);
        }
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <section className="py-32 px-6 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="titlePort">Prévia Portfólio</h2>
          <p className="subTitlePort">
            Uma seleção de trabalhos que capturam a essência de cada momento
          </p>
        </motion.div>

        <div className="gradeFotos grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg ${image.span}`}
            >
              {/* IMG */}
              <motion.img
                src={image.image_url}
                alt={image.title || "Foto"}
                className="gallery-img w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* Noise */}
              <div className="noise-overlay"></div>

              {/* Hover */}
              <div className="hover-overlay">
                <a href="/gallery" className="hover-text">
                  Ver Mais
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
