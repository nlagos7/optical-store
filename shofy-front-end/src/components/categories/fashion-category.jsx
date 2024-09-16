'use client';
import React from "react";
import { useRouter } from "next/navigation";
import home_1 from '@assets/img/menu/menu-home-1.png';
import home_2 from '@assets/img/menu/menu-home-2.png';
import home_3 from '@assets/img/menu/menu-home-3.png';

// Datos locales para las categorías
const localCategories = [
  {
    _id: 1,
    parent: "Hombre",
    img: home_2, // Imagen local
  },
  {
    _id: 2,
    parent: "Mujer",
    img: home_1, // Imagen local
  },
  {
    _id: 3,
    parent: "Niños",
    img: home_3, // Imagen local
  }
];

const FashionCategory = () => {
  const router = useRouter();

  // Maneja la navegación a la ruta de la categoría
  const handleCategoryRoute = (title) => {
    // Verifica si es "Hombre" o "Mujer" y añade "unisex"
    const unisex = (title === "Hombre" || title === "Mujer") ? ",unisex" : "";
    
    // Crea la ruta con el parámetro unisex si corresponde
    const route = `/shop?subCategory=${title
      .toLowerCase()
      .replace("&", "")
      .split(" ")
      .join("-")}${unisex}`;
    
    // Navega a la ruta
    router.push(route);
  };

  return (
    <section className="container tp-banner-area mt-20">
      <div className="container-fluid">
        <div className="row tp-gx-20">
          {localCategories.map((item) => (
            <div key={item._id} className="col-xxl-4 col-lg-4 col-4" 
            onClick={() => handleCategoryRoute(item.parent)}>
              <div className="tp-banner-item-2 p-relative z-index-1 grey-bg-2 mb-20 fix">
                <div
                  className="tp-banner-thumb-2 p-relative transition-3"
                  style={{
                    backgroundImage: `url(${item.img.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px", // Altura predeterminada
                  }}
                ></div>
                <h3 className="tp-banner-title-2">
                    {item.parent}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FashionCategory;
