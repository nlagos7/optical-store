import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
// internal
import { Filter } from "@/svg";
import NiceSelect from "@/ui/nice-select";
import { handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";

const ShopTopRight = ({ selectHandleFilter }) => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Inicializa el estado
    handleResize();

    // Agrega un event listener para el resize
    window.addEventListener('resize', handleResize);

    // Limpia el event listener cuando el componente se desmonte
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="tp-shop-top-right d-sm-flex align-items-center justify-content-xl-end">
      <div className="tp-shop-top-select">
        <NiceSelect
          options={[
            { value: "Default Sorting", text: "Orden por defecto" },
            { value: "Low to High", text: "De menor a mayor" },
            { value: "High to Low", text: "De mayor a menor" },
            { value: "New Added", text: "Nuevos agregados" },
            { value: "On Sale", text: "En oferta" },
          ]}
          defaultCurrent={0}
          onChange={selectHandleFilter}
          name="Default Sorting"
        />
      </div>
      {isMobile && (
        <div className="tp-shop-top-filter">
          <button onClick={() => dispatch(handleFilterSidebarOpen())} type="button" className="tp-filter-btn">
            <span>
              <Filter />
            </span>
            {" "}Filtrar
          </button>
        </div>
      )}
    </div>
  );
};

export default ShopTopRight;
