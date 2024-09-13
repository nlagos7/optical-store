'use client'
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
// internal
import ErrorMsg from "@/components/common/error-msg";
import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";

// Función para normalizar las cadenas (formatear slugs)
const normalizeSlug = (str) => {
  return str.toLowerCase().replace("&", "").split(" ").join("-");
};

const SubCategoryFilter = ({ setCurrPage, shop_right = false, selectedCategory, setSelectedSubCategory }) => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const subCategory = searchParams.get('subCategory');

  // handle subcategory route
  const handleSubCategoryRoute = (title) => {
    setCurrPage(1);
    const normalizedSubCategory = normalizeSlug(title); // Usamos la función para normalizar

    setSelectedSubCategory(normalizedSubCategory); // Actualizar subcategoría seleccionada

    // Si la subcategoría es "hombre" o "mujer", agregar "unisex"
    let subCategorySlug = normalizedSubCategory;
    if (subCategorySlug === "hombre" || subCategorySlug === "mujer") {
      subCategorySlug = `${subCategorySlug},unisex`;
    }

    // Redirigir con la categoría modificada
    router.push(
      `/${shop_right ? 'shop-right-sidebar' : 'shop'}?category=${selectedCategory}&subCategory=${subCategorySlug}`
    );
    dispatch(handleFilterSidebarClose());
  };

  // handle "Ver todo" route (clear subcategory)
  const handleViewAllRoute = () => {
    setCurrPage(1);
    setSelectedSubCategory(null); // Restablecer subcategoría
    router.push(`/${shop_right ? 'shop-right-sidebar' : 'shop'}?category=${selectedCategory}`);
    dispatch(handleFilterSidebarClose());
  };

  // Extraer todos los children de cada categoría y eliminamos duplicados
  let uniqueChildren = [];
  if (categories?.result) {
    const allChildren = categories.result
      .map((category) => category.children) // Obtener todos los children
      .flat(); // Aplanar el array de arrays

    // Eliminar duplicados usando un Set
    uniqueChildren = [...new Set(allChildren)];
  }

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && uniqueChildren.length === 0) {
    content = <ErrorMsg msg="No Sub Categories found!" />;
  }
  if (!isLoading && !isError && uniqueChildren.length > 0) {
    content = (
      <>
        {/* Add "Ver todo" at the beginning */}
        <li>
          <a
            onClick={handleViewAllRoute}
            style={{ cursor: "pointer" }}
            className={!subCategory ? "active" : ""}
          >
            Ver todo
          </a>
        </li>
        {uniqueChildren.map((item, index) => {
          const normalizedItem = normalizeSlug(item); // Normalizamos el nombre del children

          // Verificar si la categoría actual incluye el item (para manejar el caso de 'hombre,unisex')
          const isActive = subCategory?.split(",").includes(normalizedItem);

          return (
            <li key={index}>
              <a
                onClick={() => handleSubCategoryRoute(item)}
                style={{ cursor: "pointer" }}
                className={isActive ? "active" : ""}
              >
                {item}
              </a>
            </li>
          );
        })}
      </>
    );
  }

  return (
    <div className="tp-shop-widget mb-50">
      <h3 className="tp-shop-widget-title">Sub categorías</h3>
      <div className="tp-shop-widget-content">
        <div className="tp-shop-widget-categories">
          <ul>{content}</ul>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryFilter;
