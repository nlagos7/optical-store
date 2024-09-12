'use client';
import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
// internal
import { AskQuestion, CompareTwo, WishlistTwo } from '@/svg';
import DetailsBottomInfo from './details-bottom-info';
import ProductDetailsCountdown from './product-details-countdown';
import { add_cart_product } from '@/redux/features/cartSlice';
import { add_to_wishlist } from '@/redux/features/wishlist-slice';
import { add_to_compare } from '@/redux/features/compareSlice';
import { handleModalClose } from '@/redux/features/productModalSlice';
import { Minus, Plus } from '@/svg';
import { decrement, increment } from '@/redux/features/cartSlice';

const DetailsWrapper = ({ productItem, handleImageActive, activeImg, detailsBottom = false }) => {
  const { sku, img, title, imageURLs, category, description, discount, price, status, reviews, tags, offerDate, quantity } = productItem || {};
  const [ratingVal, setRatingVal] = useState(0);
  const [textMore, setTextMore] = useState(false);
  const dispatch = useDispatch();
  const { orderQuantity } = useSelector((state) => state.cart);

  const [productUrl, setProductUrl] = useState('');

  // Obtener automáticamente la URL actual de la página
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setProductUrl(window.location.href);
    }
  }, []);

  // handleIncrease
  const handleIncrease = () => {
    if (orderQuantity < quantity) {
      dispatch(increment());
    }
  };

  // handleDecrease
  const handleDecrease = () => {
    dispatch(decrement());
  };

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;
      setRatingVal(rating);
    } else {
      setRatingVal(0);
    }
  }, [reviews]);

  // handle add product
  const handleAddProduct = (prd) => {
    dispatch(add_cart_product(prd));
  };

  // handle wishlist product
  const handleWishlistProduct = (prd) => {
    dispatch(add_to_wishlist(prd));
  };

  // handle compare product
  const handleCompareProduct = (prd) => {
    dispatch(add_to_compare(prd));
  };

  return (
    <div className="tp-product-details-wrapper">
      <div className="tp-product-details-category">
        <span>{category.name}</span>
      </div>
      <h3 className="tp-product-details-title">{title}</h3>

      {/* inventory details */}
      <div className="tp-product-details-inventory d-flex align-items-center mb-10">
        <div className="tp-product-details-stock mb-10">
          <span>{status}</span>
        </div>
      </div>
      <p>
        {textMore ? description : `${description.substring(0, 100)}`}
        {description.length >= 100 && (
          <span onClick={() => setTextMore(!textMore)}>
            {textMore ? ' Ver menos' : '... Ver más'}
          </span>
        )}
      </p>

      {/* price */}
      <div className="tp-product-details-price-wrapper mb-20">
        {discount > 0 ? (
          <>
            <span className="tp-product-details-price old-price">${price}</span>
            <span className="tp-product-details-price new-price">
              {" "}${(Number(price) - (Number(price) * Number(discount)) / 100).toLocaleString('es-ES')}
            </span>
          </>
        ) : (
          <span className="tp-product-details-price new-price">${price.toLocaleString('es-ES')}</span>
        )}
      </div>

      {/* variations */}
      {imageURLs.some(item => item?.color && item?.color?.name) && <div className="tp-product-details-variation">
        <div className="tp-product-details-variation-item">
          <h4 className="tp-product-details-variation-title">Color :</h4>
          <div className="tp-product-details-variation-list">
            {imageURLs.map((item, i) => (
            item.color && item.color.name ? (
              <button
                onClick={() => handleImageActive(item)}
                key={i}
                type="button"
                className={`color tp-color-variation-btn ${item.img === activeImg ? "active" : ""}`}
              >
                <span
                  data-bg-color={`${item.color.clrCode}`}
                  style={{ backgroundColor: `${item.color.clrCode}` }}
                ></span>
                <span className="tp-color-variation-tootltip">
                  {item.color.name}
                </span>
              </button>
            ) : null
          ))}
          </div>
        </div>
      </div>}

      {/* if ProductDetailsCountdown true start */}
      {offerDate?.endDate && <ProductDetailsCountdown offerExpiryTime={offerDate?.endDate} />}
      {/* if ProductDetailsCountdown true end */}

      {/* actions */}
      <div className="tp-product-details-action-wrapper">
        <Link href="/cart" onClick={() => handleAddProduct(productItem)}>
          <button className="tp-product-details-buy-now-btn w-100">Comprar</button>
        </Link>
      </div>
      {/* product-details-action-sm start */}
      <div className="tp-product-details-action-sm">
        <button disabled={status === 'out-of-stock'} onClick={() => handleCompareProduct(productItem)} type="button" className="tp-product-details-action-sm-btn">
          <CompareTwo />
          Comparar
        </button>
        <button disabled={status === 'out-of-stock'} onClick={() => dispatch(handleModalClose())} type="button" className="tp-product-details-action-sm-btn">
          <WishlistTwo />
          Agregar a favoritos
        </button>
        <button type="button" className="tp-product-details-action-sm-btn">
          <AskQuestion />
          Consultar
        </button>
      </div>
      {/* product-details-action-sm end */}

      {detailsBottom && (
        <DetailsBottomInfo 
          category={category?.name} 
          sku={sku} 
          tag={tags[0]} 
          productUrl={productUrl} 
          productName={title} 
        />
      )}
    </div>
  );
};

export default DetailsWrapper;
