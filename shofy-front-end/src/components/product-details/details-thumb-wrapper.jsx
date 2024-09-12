'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import PopupVideo from "../common/popup-video";

// Modal para mostrar la imagen en grande y cambiar con swipe, zoom y movimiento
const ImageModal = ({ isOpen, images, activeIndex, onClose, onNext, onPrev }) => {
  const [scale, setScale] = useState(1); // Estado para controlar el zoom
  const [isDragging, setIsDragging] = useState(false); // Estado para saber si estamos arrastrando
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Estado de la posición de la imagen
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Posición inicial al hacer clic

  // Manejo del swipe para dispositivos móviles y escritorio
  const handlers = useSwipeable({
    onSwipedLeft: () => onNext(),
    onSwipedRight: () => onPrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Permite que también funcione con el mouse en escritorio
  });

  // Deshabilitar el scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Restaurar el scroll cuando se cierra el modal
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Función para cerrar el modal al hacer clic en el fondo
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  // Función para hacer zoom
  const handleWheelZoom = (e) => {
    e.preventDefault();
    const newScale = e.deltaY < 0
      ? Math.min(scale + 0.1, 3) // Zoom in con límite máximo de 3x
      : Math.max(scale - 0.1, 1); // Zoom out con límite mínimo de 1x

    setScale(newScale);
  };

  // Iniciar el arrastre
  const handleMouseDown = (e) => {
    if (scale > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  // Finalizar el arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Controlar el arrastre
  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      {...handlers}
      onClick={handleClickOutside}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="modal-content">
        {/* Flecha izquierda para imagen anterior */}
        <button className="arrow-left" onClick={onPrev}>
          &#10094;
        </button>

        {/* Imagen actual con zoom y movimiento */}
        <div
          className="zoomable-image-wrapper"
          onWheel={handleWheelZoom}
          onMouseDown={handleMouseDown}
        >
          <Image
            src={images[activeIndex].img}
            alt="product img enlarged"
            layout="intrinsic"
            width={800}
            height={800}
            style={{
              maxWidth: "100%",
              maxHeight: "100vh",
              width: "auto",
              height: "auto",
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              transition: !isDragging ? "transform 0.2s ease" : "none", // Suavizar solo cuando no arrastra
              cursor: scale > 1 ? "grab" : "default", // Mostrar cursor de arrastre si está haciendo zoom
            }}
          />
        </div>

        {/* Flecha derecha para imagen siguiente */}
        <button className="arrow-right" onClick={onNext}>
          &#10095;
        </button>

        <button onClick={onClose} className="close-modal">Cerrar</button>
      </div>
    </div>
  );
};

const DetailsThumbWrapper = ({
  imageURLs,
  handleImageActive,
  activeImg,
  imgWidth = 416,
  imgHeight = 480,
  videoId = false,
  status
}) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Estado para controlar el modal de la imagen
  const [activeIndex, setActiveIndex] = useState(0); // Índice de la imagen activa

  // Función para abrir el modal de la imagen
  const handleImageClick = (index) => {
    setActiveIndex(index);
    setIsImageModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  };

  // Función para ir a la siguiente imagen
  const handleNextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % imageURLs.length);
    handleImageActive(imageURLs[(activeIndex + 1) % imageURLs.length]); // Actualizar la imagen principal
  };

  // Función para ir a la imagen anterior
  const handlePrevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + imageURLs.length) % imageURLs.length);
    handleImageActive(imageURLs[(activeIndex - 1 + imageURLs.length) % imageURLs.length]); // Actualizar la imagen principal
  };

  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <nav>
          <div className="nav nav-tabs flex-sm-column">
            {imageURLs?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${item.img === activeImg ? "active" : ""}`}
                onClick={() => {
                  handleImageActive(item);
                  setActiveIndex(i);
                }}
              >
                <Image
                  src={item.img}
                  alt="image"
                  width={78}
                  height={100}
                  style={{ width: "100%", height: "100%" }}
                />
              </button>
            ))}
          </div>
        </nav>
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              {/* Flecha izquierda para cambiar la imagen anterior en la imagen principal */}
              <button className="arrow-left" onClick={handlePrevImage}>
                &#10094;
              </button>

              {/* Imagen principal */}
              <Image
                src={activeImg}
                alt="product img"
                width={imgWidth}
                height={imgHeight}
                onClick={() => handleImageClick(activeIndex)} // Abrir modal con la imagen activa
                style={{ cursor: "pointer" }} // Añadir cursor para indicar que es clickeable
              />

              {/* Flecha derecha para cambiar la imagen siguiente en la imagen principal */}
              <button className="arrow-right" onClick={handleNextImage}>
                &#10095;
              </button>

              <div className="tp-product-badge">
                {status === 'out-of-stock' && <span className="product-hot">Sin stock</span>}
              </div>

              {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="tp-product-details-thumb-video"
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* modal popup for video */}
      {videoId && (
        <PopupVideo
          isVideoOpen={isVideoOpen}
          setIsVideoOpen={setIsVideoOpen}
          videoId={videoId}
        />
      )}

      {/* modal popup for image with swipe and zoom functionality */}
      <ImageModal
        isOpen={isImageModalOpen}
        images={imageURLs}
        activeIndex={activeIndex}
        onClose={handleCloseModal}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </>
  );
};

export default DetailsThumbWrapper;
