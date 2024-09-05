'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Navigation, Autoplay } from 'swiper/modules'; // Importa Autoplay
// internal
import slider_img_1 from '@assets/img/slider/2/slider-1.png';
import slider_img_2 from '@assets/img/slider/2/slider-2.png';
import slider_img_3 from '@assets/img/slider/2/slider-3.png';
import slider_shape from '@assets/img/slider/2/shape/shape-1.png';
import thumb_shape_1 from '@assets/img/slider/2/shape/shape-2.png';
import thumb_shape_2 from '@assets/img/slider/2/shape/shape-3.png';
import background1 from '@assets/img/banner/1.png';
import background2 from '@assets/img/banner/2.png';
import background3 from '@assets/img/banner/3.png';

// slider data 
const slider_data = [
  {
    id: 1,
    background: background1,
    subtitle: 'Colección 2024',
    title: 'Mejora tu salud visual',
    img: slider_img_1,
  },
  {
    id: 2,
    background: background2,
    subtitle: 'Best Selling 2023',
    title: 'The Summer Collection',
    img: slider_img_2,
  },
  {
    id: 3,
    background: background3,
    subtitle: 'Winter Has Arrived',
    title: 'Amazing New designs',
    img: slider_img_3,
  },
]

// slider setting 
const slider_setting = {
  slidesPerView: 1,
  spaceBetween: 30,
  effect: 'fade',
  navigation: {
    nextEl: ".tp-slider-2-button-next",
    prevEl: ".tp-slider-2-button-prev",
  },
  pagination: {
    el: ".tp-slider-2-dot",
    clickable: true,
  },
  autoplay: {
    delay: 900000, // Cambia de slide cada 4 segundos
    disableOnInteraction: false, // El autoplay no se detendrá si el usuario interactúa con los controles de navegación
  },
}

const FashionBanner = () => {
  return (
    <>
      <section className="tp-slider-area p-relative z-index-1">
        <Swiper {...slider_setting} modules={[Pagination, Navigation, EffectFade, Autoplay]} className="tp-slider-active-2 swiper-container">
          {slider_data.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="tp-slider-item-2 p-relative grey-bg-5 d-flex align-items-end" style={{ height: '100%' }}>
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                  <Image 
                    src={item.background} 
                    alt={item.subtitle}
                    layout="responsive" // Usamos 'responsive' para que la imagen se adapte al tamaño del contenedor
                    width={1920} // Ajusta según sea necesario
                    height={1080} // Ajusta según sea necesario
                    objectFit="cover" // Mantendrá la proporción cubriendo todo el contenedor
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }} // Asegura que la imagen ocupe todo el espacio
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="tp-swiper-dot tp-slider-2-dot"></div>
        </Swiper>
      </section>
    </>
  );
};

export default FashionBanner;
