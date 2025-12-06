import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import "../layout/gallery.css";
import { fetchSiteContent } from "../api";
import Navbar from "../components/Navbar";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// =============================
// NAV DE FILTRO
// =============================
const GalleryFilterNav = ({ active, setActive, filters, className }) => {
  return (
    <nav className={className}>
      {filters.map((item) => (
        <button
          key={item.value}
          className={`filter-btn ${active === item.value ? "active" : ""}`}
          onClick={() => setActive(item.value)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

// =============================
// MODAL DE IMAGEM COM ZOOM, LABEL E DOTS
// =============================
const ImageModal = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  setCurrentIndex,
}) => {
  const [fade, setFade] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef(null);
  const overlayRef = useRef(null);

  // ================================
  // ANIMAÇÃO AO ABRIR
  // ================================
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);

      if (overlayRef.current) {
        overlayRef.current.style.pointerEvents = "auto";
        overlayRef.current.style.visibility = "visible";
      }

      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );

      gsap.fromTo(
        modalRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [isOpen]);

  // ================================
  // ANIMAÇÃO AO FECHAR
  // ================================
  const handleClose = () => {
    setIsClosing(true);

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.pointerEvents = "none";
          overlayRef.current.style.visibility = "hidden";
        }
      },
    });

    gsap.to(modalRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        onClose();
      },
    });
  };

  if (!isOpen && !isClosing) return null;

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setFade(true);
    }, 200);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 200);
  };

  return (
    <div className="modal-overlay" ref={overlayRef}>
      <div className="modal-contentGallery" ref={modalRef}>
        <div className="modal-label">{images[currentIndex].category}</div>

        <button className="modal-close" onClick={handleClose}>
          <X size={24} />
        </button>

        <button className="modal-nav left" onClick={handlePrev}>
          <ChevronLeft size={32} />
        </button>

        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className={`modal-image ${fade ? "fade-in" : "fade-out"}`}
        />

        <button className="modal-nav right" onClick={handleNext}>
          <ChevronRight size={32} />
        </button>

        {/* ================================
            PAGINATION DOTS
        ================================ */}
        <div className="pagination-wrapper">
          <div className="pagination-dots">
            {images.map((_, index) => (
              <div
                key={index}
                className={`dot ${currentIndex === index ? "active" : ""}`}
                onClick={() => setCurrentIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================
// BLOCO DA GALERIA (DINÂMICO)
// =============================
const GalleryBlock = ({ images, openModal }) => {
  const rows = [];
  for (let i = 0; i < images.length; i += 5) {
    rows.push(images.slice(i, i + 5));
  }

  return (
    <>
      {rows.map((group, index) => {
        const topImages = group.slice(0, 3);
        const bottomImages = group.slice(3, 5);

        return (
          <div key={index}>
            <div className="top-grid">
              {topImages.map((img, i) => (
                <div
                  key={i}
                  className={`col-span-${i === 1 ? 6 : 3}`}
                  onClick={() => openModal(img)}
                >
                  <div className="noisy" />
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>

            <div className="bottom-grid">
              {bottomImages.map((img, i) => (
                <div
                  key={i}
                  className={`col-span-${i === 0 ? 8 : 4}`}
                  onClick={() => openModal(img)}
                >
                  <div className="noisy" />
                  <img src={img.src} alt={img.alt} />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

// =============================
// GALERIA PRINCIPAL
// =============================
const Gallery = () => {
  const navbarRef = useRef(null);
  const linhaRef = useRef(null);
  const btnRef = useRef(null);

  const [imagesData, setImagesData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImages, setModalImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca os dados da API
  useEffect(() => {
    (async () => {
      setLoading(true);

      const data = await fetchSiteContent();
      const portfolio = data.portfolio || [];

      setImagesData(
        portfolio.map((img) => ({
          src: img.url,
          alt: img.titulo || "Foto",
          category: img.category || "all",
        }))
      );

      const categorias = Array.from(
        new Set(portfolio.map((i) => i.category || "all"))
      );

      setFilters([
        { label: "Todos", value: "all" },
        ...categorias.map((c) => ({ label: c, value: c })),
      ]);

      setLoading(false);
    })();
  }, []);

  const filteredImages =
    filter === "all"
      ? imagesData
      : imagesData.filter((img) => img.category === filter);

  const openModal = (img) => {
    const index = filteredImages.indexOf(img);
    setCurrentIndex(index);
    setModalImages(filteredImages);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".titleGaleria",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 }
    )
      .fromTo(
        ".subTitleGallery",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "<"
      )
      .fromTo(
        ".GalleryFilterNav",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
      .fromTo(
        ".imgsAnimation",
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "<"
      );
  }, []);

  // ================================
  // LOADING SPINNER
  // ================================
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar navbarRef={navbarRef} linhaRef={linhaRef} btnRef={btnRef} />

      <div id="about">
        <section className="sectionGallery">
          <h1 className="titleGaleria" id="gallery">
            Portfólio Completo
          </h1>

          <p className="subTitleGallery">
            Uma coleção de momentos capturados ao longo dos anos. Cada imagem
            conta uma história única, revelando emoções, beleza e a essência de
            cada instante eternizado.
          </p>

          <GalleryFilterNav
            active={filter}
            setActive={setFilter}
            filters={filters}
            className="GalleryFilterNav"
          />

          <div className="imgsAnimation">
            <GalleryBlock images={filteredImages} openModal={openModal} />
          </div>
        </section>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        images={modalImages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        onClose={closeModal}
      />
    </div>
  );
};

export default Gallery;
