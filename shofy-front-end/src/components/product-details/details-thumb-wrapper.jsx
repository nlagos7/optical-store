'use client';
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

// Componente principal de visualización de imágenes estilo Mercado Libre (sin zoom)
const DetailsThumbWrapper = ({
  imageURLs,
  handleImageActive,
  activeImg,  // Este prop ahora viene del componente padre
  imgWidth = 416,
  imgHeight = 480,
}) => {
  const [activeIndex, setActiveIndex] = useState(0); // Índice de la imagen activa
  const [isMobile, setIsMobile] = useState(false); // Estado para detectar si es versión móvil
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const touchStartX = useRef(0); // Para almacenar el inicio del gesto de swipe
  const touchEndX = useRef(0); // Para almacenar el final del gesto de swipe
  const touchMoved = useRef(false); // Para determinar si el toque fue un swipe o un clic

  // Cambiar la imagen activa y actualizar el índice basado en la imagen
  const changeImage = (index) => {
    if (index >= 0 && index < imageURLs.length) {
      setActiveIndex(index); // Actualizamos el índice activo
      handleImageActive(imageURLs[index]); // Actualizamos la imagen activa
    }
  };

  // Sincronizar la imagen activa con el estado recibido desde el componente padre
  useEffect(() => {
    const index = imageURLs.findIndex((img) => img.img === activeImg); // Buscar el índice de la imagen activa
    if (index !== -1) {
      setActiveIndex(index); // Actualizar el índice si la imagen coincide
    }
  }, [activeImg, imageURLs]);

  // Detectar si es móvil
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Asume móvil si el ancho es <= 768px
    };
    handleResize(); // Llamar inmediatamente para ajustar el estado
    window.addEventListener("resize", handleResize); // Escuchar cambios en el tamaño de ventana
    return () => window.removeEventListener("resize", handleResize); // Limpiar el evento al desmontar
  }, []);

  // Efecto para deshabilitar el scroll de fondo cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Desactivar el scroll del fondo
    } else {
      document.body.style.overflow = ''; // Volver a activar el scroll
    }
    return () => {
      document.body.style.overflow = ''; // Limpiar al desmontar el componente
    };
  }, [isModalOpen]);

  // Funciones para detectar el gesto de swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX; // Almacenar la posición inicial del dedo
    touchMoved.current = false; // Inicializar touchMoved
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX; // Almacenar la posición del dedo mientras se mueve
    touchMoved.current = true; // Marcar que el usuario ha deslizado
  };

  const handleTouchEnd = () => {
    if (!touchMoved.current) return; // Si el usuario no deslizó, no hacemos nada

    if (touchStartX.current - touchEndX.current > 50) {
      // Si desliza a la izquierda (swipe left)
      changeImage((activeIndex + 1) % imageURLs.length); // Cambiar a la siguiente imagen, con efecto infinito
    } else if (touchStartX.current - touchEndX.current < -50) {
      // Si desliza a la derecha (swipe right)
      changeImage((activeIndex - 1 + imageURLs.length) % imageURLs.length); // Cambiar a la imagen anterior, con efecto infinito
    }
  };

  // Abrir el modal al hacer clic en la imagen
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cerrar el modal al hacer clic en el fondo oscuro
  const closeModal = (e) => {
    if (e.target.classList.contains('modal-background')) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="ml-image-viewer" style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Miniaturas solo en desktop */}
      {!isMobile && (
        <div className="thumbnail-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {imageURLs?.map((item, i) => (
            <button
              key={i}
              className={`thumbnail-button ${i === activeIndex ? "active" : ""}`}
              onMouseEnter={() => changeImage(i)} // Cambia la imagen al hacer hover
              onClick={() => changeImage(i)} // Asegura que también cambia al hacer clic
              style={{
                border: i === activeIndex ? "1px solid black" : "1px solid #e0e0e0", // Siempre un borde de 1px
                padding: '2px', // Ajuste para que la imagen no quede pegada al borde
                transition: 'border 0.2s ease-in-out', // Transición suave
              }}
            >
              <Image
                src={item.img}
                alt="product-thumbnail"
                width={78}
                height={100}
                quality={100} // Calidad máxima para la miniatura
                style={{ width: "100%", height: "100%", objectFit: "contain" }} // Aseguramos que las miniaturas también mantengan proporciones
                priority={i === 0} // Prioriza la primera imagen
              />
            </button>
          ))}
        </div>
      )}

      {/* Imagen principal */}
      <div
        className="main-image-container"
        style={{ position: "relative", backgroundColor: "#fff", marginLeft: !isMobile ? '20px' : '0', width: isMobile ? '100%' : `${imgWidth}px`, height: isMobile ? 'auto' : `${imgHeight}px` }}
        onClick={openModal} // Abrir modal al hacer clic en la imagen
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd} // Swipe para la vista normal
      >
        <div
          className="main-image"
          style={{
            position: 'relative',
            width: "100%",
            height: "100%",
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Centrar imagen verticalmente
          }}
        >
          <Image
            src={activeImg} // Utilizar activeImg directamente
            alt="product img"
            width={imgWidth}
            height={imgHeight}
            quality={100} // Forzar máxima calidad
            priority // Priorizar la imagen principal para evitar demoras
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain", // Ajuste para que la imagen siempre mantenga sus proporciones
              width: isMobile ? 'auto' : `${imgWidth}px`,
              height: isMobile ? 'auto' : `${imgHeight}px`,
            }}
          />

          {/* Contador de imágenes en la imagen principal */}
          {isMobile && (
            <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '14px' }}>
              {activeIndex + 1} / {imageURLs.length}
            </div>
          )}
        </div>

        {/* Indicadores de posición (círculos) para Mobile (vista normal) */}
        {isMobile && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            {imageURLs?.map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: i === activeIndex ? '#000' : '#e0e0e0',
                  margin: '0 4px',
                  cursor: 'pointer',
                }}
                onClick={() => changeImage(i)} // Cambiar imagen al hacer clic en los círculos
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal para mostrar slideshow */}
      {isModalOpen && (
        <div
          className="modal-background"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={closeModal} // Cerrar modal al hacer clic en el fondo oscuro
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd} // Swipe dentro del modal
        >
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: '#fff',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            &times;
          </button>

          {/* Contador de imágenes fuera de la imagen, al mismo nivel que el botón cerrar */}
          <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '14px' }}>
            {activeIndex + 1} / {imageURLs.length}
          </div>

          <div
            className="modal-content"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '100%',
              maxHeight: '100%',
              backgroundColor: '#fff', // Fondo blanco para la imagen
              borderRadius: '0', // Aquí añadimos el border: 0
            }}
            onClick={(e) => e.stopPropagation()} // Evitar cerrar el modal al hacer clic en la imagen
          >
            <Image
              src={imageURLs[activeIndex].img} // Mostrar la imagen actual en el modal
              alt="modal-image"
              layout="intrinsic"
              objectFit="contain"
              width={800}
              height={800}
              style={{
                objectFit: 'contain', // Ajustar la imagen al tamaño disponible
                width: isMobile ? '100%' : 'auto', // Aplicar width 100% solo en mobile
                height: 'auto',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </div>

          {/* Flechas para cambiar imagen en el modal en DESKTOP */}
          {!isMobile && (
            <>
              <button
                onClick={() => changeImage((activeIndex - 1 + imageURLs.length) % imageURLs.length)} // Imagen anterior en el modal
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.6)', // Fondo semitransparente oscuro
                  border: 'none',
                  width: '40px', // Tamaño del botón cuadrado
                  height: '40px',
                  borderRadius: '8px', // Esquinas redondeadas
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '20px', // Tamaño de la flecha
                  transition: 'background 0.3s ease', // Transición suave para el fondo
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')} // Efecto hover
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)')} // Quitar efecto hover
              >
                &larr;
              </button>

              <button
                onClick={() => changeImage((activeIndex + 1) % imageURLs.length)} // Siguiente imagen en el modal
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.6)', // Fondo semitransparente oscuro
                  border: 'none',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                  fontSize: '20px',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)')}
              >
                &rarr;
              </button>
            </>
          )}

          {/* Círculos indicadores para cambiar imagen en el modal en mobile */}
          {isMobile && (
            <div style={{ position: 'absolute', bottom: '20px', display: 'flex', justifyContent: 'center' }}>
              {imageURLs?.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: i === activeIndex ? '#fff' : '#888',
                    margin: '0 6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => changeImage(i)} // Cambiar la imagen en el modal al hacer clic en los indicadores
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsThumbWrapper;
