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

const CategoryFilter = ({ setCurrPage, shop_right = false, setSelectedCategory, setSelectedSubCategory, setHasSubCategories }) => {
  const { data: categories, isLoading, isError } = useGetShowCategoryQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // handle category route
  const handleCategoryRoute = (title, hasChildren) => {
    setCurrPage(1);
    const normalizedCategory = normalizeSlug(title); // Usamos la función para normalizar

    setSelectedCategory(normalizedCategory); // Almacenar categoría seleccionada
    setSelectedSubCategory(null); // Restablecer subcategorías
    setHasSubCategories(hasChildren); // Establecer si tiene subcategorías

    router.push(
      `/${shop_right ? 'shop-right-sidebar' : 'shop'}?category=${normalizedCategory}`
    );
    dispatch(handleFilterSidebarClose());
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <ShopCategoryLoader loading={isLoading} />;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result?.length === 0) {
    content = <ErrorMsg msg="No Category found!" />;
  }
  if (!isLoading && !isError && categories?.result?.length > 0) {
    const category_items = categories.result;
    content = category_items.map((item) => (
      <li key={item._id}>
        <a
          onClick={() => handleCategoryRoute(item.parent, item.children.length > 0)}
          style={{ cursor: "pointer" }}
          className={
            category === normalizeSlug(item.parent) ? "active" : ""
          }
        >
          {item.parent} <span>{item.products.length}</span>
        </a>
      </li>
    ));
  }
  return (
    <>
      <div className="tp-shop-widget mb-50">
        <h3 className="tp-shop-widget-title">Categorías</h3>
        <div className="tp-shop-widget-content">
          <div className="tp-shop-widget-categories">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
