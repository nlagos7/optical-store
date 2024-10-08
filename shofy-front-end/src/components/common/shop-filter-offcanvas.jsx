import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "../shop/shop-filter/category-filter";
import ColorFilter from "../shop/shop-filter/color-filter";
import PriceFilter from "../shop/shop-filter/price-filter";
import ProductBrand from "../shop/shop-filter/product-brand";
import StatusFilter from "../shop/shop-filter/status-filter";
import TopRatedProducts from "../shop/shop-filter/top-rated-products";
import { handleFilterSidebarClose, handleFilterSidebarOpen } from "@/redux/features/shop-filter-slice";
import ResetButton from "../shop/shop-filter/reset-button";
import SubCategoryFilter from "../shop/shop-filter/subcategory-filter";

const ShopFilterOffCanvas = ({
  all_products,
  otherProps,
  right_side = false,
}) => {
  const { priceFilterValues, setCurrPage } = otherProps;
  const { filterSidebar } = useSelector((state) => state.shopFilter);
  const [selectedCategory, setSelectedCategory] = useState(null); // Nueva: para manejar categoría seleccionada
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Nueva: para manejar subcategoría seleccionada
  const [hasSubCategories, setHasSubCategories] = useState(true); // Nueva: para determinar si la categoría tiene subcategorías
  const dispatch = useDispatch();

  // max price
  const maxPrice = all_products.reduce((max, product) => {
    return product.price > max ? product.price : max;
  }, 0);

  return (
    <>
      <div
        className={`tp-filter-offcanvas-area ${
          filterSidebar ? "offcanvas-opened" : ""
        }`}
      >
        <div className="tp-filter-offcanvas-wrapper">
          <div className="tp-filter-offcanvas-close">
            <button
              type="button"
              onClick={() => dispatch(handleFilterSidebarClose())}
              className="tp-filter-offcanvas-close-btn filter-close-btn"
            >
              <i className="fa-solid fa-xmark"></i>
              {" "}Cerrar
            </button>
          </div>
          <div className="tp-shop-sidebar">
            {/* filter */}
            <PriceFilter
              priceFilterValues={priceFilterValues}
              maxPrice={maxPrice}
            />
            {/* categories */}
            <CategoryFilter setCurrPage={setCurrPage} shop_right={right_side} 
                    setSelectedCategory={setSelectedCategory}
                    setSelectedSubCategory={setSelectedSubCategory} // Restablecer subcategoría
                    setHasSubCategories={setHasSubCategories} // Determinar si la categoría tiene subcategorías
                    />
            <SubCategoryFilter setCurrPage={setCurrPage} shop_right={right_side} 
                      selectedCategory={selectedCategory} // Pasar categoría seleccionada
                      setSelectedSubCategory={setSelectedSubCategory} // Mantenimiento de subcategoría
                      />
            {/* color */}
            <ColorFilter setCurrPage={setCurrPage} shop_right={right_side} />
            {/* product rating 
            <TopRatedProducts />*/}
            {/* brand */}
            <ProductBrand setCurrPage={setCurrPage} shop_right={right_side} />
            {/* reset filter */}
            <ResetButton shop_right={right_side} />
          </div>
        </div>
      </div>

      {/* overlay start */}
      <div
        onClick={() => dispatch(handleFilterSidebarClose())}
        className={`body-overlay ${filterSidebar ? "opened" : ""}`}
      ></div>
      {/* overlay end */}
    </>
  );
};

export default ShopFilterOffCanvas;
