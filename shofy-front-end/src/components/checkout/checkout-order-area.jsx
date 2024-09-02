'use client';
import { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
// internal
import useCartInfo from "@/hooks/use-cart-info";
import ErrorMsg from "../common/error-msg";

const CheckoutOrderArea = ({ checkoutData }) => {
  const {
    handleShippingCost = 0,
    cartTotal = 0,
    stripe,
    isCheckoutSubmit,
    clientSecret,
    register,
    errors,
    showCard,
    setShowCard = true,
    shippingCost,
    discountAmount
  } = checkoutData;
  const { cart_products } = useSelector((state) => state.cart);
  const { total } = useCartInfo();
  return (
    <div className="tp-checkout-place white-bg">
      <h3 className="tp-checkout-place-title">Tu compra</h3>

      <div className="tp-order-info-list">
        <ul>
          {/*  header */}
          <li className="tp-order-info-list-header">
            <h4>Producto</h4>
            <h4>Total</h4>
          </li>

          {/*  item list */}
          {cart_products.map((item) => (
            <li key={item._id} className="tp-order-info-list-desc">
              <p>
                {item.title} <span> x {item.orderQuantity}</span>
              </p>
              <span>${item.price.toLocaleString('es-ES')}</span>
            </li>
          ))}

          {/*  shipping */}
          <li className="tp-order-info-list-shipping">
            <span>Envio</span>
            <div className="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_shipping"
                  type="radio"
                  name="shippingOption"
                  value="flat_shipping"
                  defaultChecked
                />
                <label
                  onClick={() => handleShippingCost(5000)}
                  htmlFor="flat_shipping"
                >
                  Domicilio :<span>$5.000</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
              <span>
                <input
                  {...register(`shippingOption`, {
                    required: `Shipping Option is required!`,
                  })}
                  id="flat_rate"
                  type="radio"
                  name="shippingOption"
                  value="flat_rate"
                />
                <label
                  onClick={() => handleShippingCost(0)}
                  htmlFor="flat_rate"
                >
                  Sucursal correos: <span>pagas al recibir</span>
                </label>
                <ErrorMsg msg={errors?.shippingOption?.message} />
              </span>
            </div>
          </li>

           {/*  subtotal */}
           <li className="tp-order-info-list-subtotal">
            <span>Subtotal</span>
            <span>${total.toLocaleString('es-ES')}</span>
          </li>

           {/*  shipping cost */}
           <li className="tp-order-info-list-subtotal">
            <span>Costo de envio</span>
            <span>${shippingCost.toLocaleString('es-ES')}</span>
          </li>

           {/* discount */}
           <li className="tp-order-info-list-subtotal">
            <span>Descuento</span>
            <span>${discountAmount.toLocaleString('es-ES')}</span>
          </li>

          {/* total */}
          <li className="tp-order-info-list-total">
            <span>Total</span>
            <span>${parseFloat(cartTotal).toLocaleString('es-ES')}</span>
          </li>
        </ul>
      </div>
      <div className="tp-checkout-payment">
        <div className="tp-checkout-payment-item">
          <input
            {...register(`payment`, {
              required: `Payment Option is required!`,
            })}
            type="radio"
            id="back_transfer"
            name="payment"
            value="Card"
            defaultChecked
          />
          <label onClick={() => setShowCard(true)} htmlFor="back_transfer" data-bs-toggle="direct-bank-transfer">
            Pagar en WebPay
          </label>
          <ErrorMsg msg={errors?.payment?.message} />
        </div>
      </div>

      <div className="tp-checkout-btn-wrapper">
        <button
          type="submit"
          disabled={!stripe || isCheckoutSubmit}
          className="tp-checkout-btn w-100"
        >
          Procesar compra
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrderArea;
