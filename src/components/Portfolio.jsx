import React from "react";
import { motion } from "framer-motion";
import "../layout/portfolio.css";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1170",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    span: "md:col-span-2 md:row-span-1",
  },
];

export default function GallerySection() {
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
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl shadow-lg ${image.span}`}
            >
              {/* IMG */}
              <motion.img
                src={image.url}
                alt={`Fotografia ${index + 1}`}
                className="gallery-img w-full h-full object-cover "
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* NOISE FIXO — SOME NO HOVER */}
              <div className="noise-overlay"></div>

              {/* TEXTO HOVER */}
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
