import { useEffect, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import "../layout/home.css";
import "../layout/home.css";
import "../layout/gallery.css";
import images from "../components/images";

const GalleryBlock = ({ topImages, bottomImages }) => {
  return (
    <div>
      <div className="top-grid">
        {topImages.map(({ img, span, alt }, i) => (
          <div key={i} className={`col-span-${span}`}>
            <div className="noisy" />
            <img src={img} alt={alt} />
          </div>
        ))}
      </div>

      <div className="bottom-grid">
        {bottomImages.map(({ img, span, alt }, i) => (
          <div key={i} className={`col-span-${span}`}>
            <div className="noisy" />
            <img src={img} alt={alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Gallery = () => {
  const firstGallery = {
    topImages: [
      { span: 3, img: images[20], alt: "grid-img-1" },
      { span: 6, img: images[21], alt: "grid-img-2" },
      { span: 3, img: images[22], alt: "grid-img-3" },
    ],
    bottomImages: [
      { span: 8, img: images[23], alt: "grid-img-4" },
      { span: 4, img: images[24], alt: "grid-img-5" },
    ],
  };

  const secondGallery = {
    topImages: [
      { span: 3, img: images[25], alt: "grid-img-6" },
      { span: 6, img: images[26], alt: "grid-img-7" },
      { span: 3, img: images[27], alt: "grid-img-8" },
    ],
    bottomImages: [
      { span: 8, img: images[28], alt: "grid-img-9" },
      { span: 4, img: images[29], alt: "grid-img-10" },
    ],
  };

  // Animação GSAP
  useLayoutEffect(() => {
    let tl = gsap.timeline();

    tl.fromTo(
        ".tilteGaleria",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
      .fromTo(
        ".imgsAnimation",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      );
  }, []);

  return (
    <div id="about">
      <section className="sectionGallery">
        <h1 className="tilteGaleria">Nossa Galeria</h1>
        <div className="imgsAnimation">
          <GalleryBlock {...firstGallery} />
          <GalleryBlock {...secondGallery} />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
