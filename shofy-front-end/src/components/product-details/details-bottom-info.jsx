'use client';
import React from "react";
import Image from "next/image";
import payment_option_img from '@assets/img/product/icons/payment-option.png';

const DetailsBottomInfo = ({ sku, category, tag, productUrl, productName }) => {
  const encodedProductUrl = encodeURIComponent(productUrl);
  const encodedProductName = encodeURIComponent(productName);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedProductUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedProductUrl}&text=${encodedProductName}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedProductUrl}`;

  return (
    <>
      {/* product-details-query */}
      <div className="tp-product-details-query">
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span>
          <p>{sku}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Categoria: </span>
          <p>{category}</p>
        </div>
        <div className="tp-product-details-query-item d-flex align-items-center">
          <span>Etiquetas: </span>
          <p>{tag}</p>
        </div>
      </div>

      {/*  product-details-social */}
      <div className="tp-product-details-social">
        <span>Compartir: </span>
        <a
          href={facebookShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en Facebook"
        >
          <i className="fa-brands fa-facebook-f"></i>
        </a>
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en Twitter"
        >
          <i className="fa-brands fa-twitter"></i>
        </a>
        <a
          href={linkedinShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartir en LinkedIn"
        >
          <i className="fa-brands fa-linkedin-in"></i>
        </a>
      </div>

      {/* product-details-msg */}
      <div className="tp-product-details-msg mb-15">
        <ul>
          <li>Ordenes con receta hasta en 7 dias habiles</li>
          {/*<li>Si compras antes de las 12:00, el pedido enviado el mismo dia</li>*/}
        </ul>
      </div>

      {/* product-details-payment 
      <div className="tp-product-details-payment d-flex align-items-center flex-wrap justify-content-between">
        <p>
          Paga seguro <br /> con
        </p>
        <Image src={payment_option_img} alt="payment_option_img" />
      </div>*/}
    </>
  );
};

export default DetailsBottomInfo;
