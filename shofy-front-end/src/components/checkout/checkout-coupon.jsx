'use client';
import { useState } from "react";
import { useSelector } from "react-redux";

const CheckoutCoupon = ({ handleCouponCode, couponRef,couponApplyMsg }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { coupon_info } = useSelector((state) => state.coupon);
  return (
    <div className="tp-checkout-verify-item">
      <p className="tp-checkout-verify-reveal">
        ¿Tienes un cupon?{" "}
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="tp-checkout-coupon-form-reveal-btn"
        >
          Ingresar cupon
        </button>
      </p>

      {isOpen && (
        <div id="tpCheckoutCouponForm" className="tp-return-customer">
          <form onSubmit={handleCouponCode}>
            <div className="tp-return-customer-input">
              <label>Codigo del cupon :</label>
              <input ref={couponRef} type="text" placeholder="Cupon" />
            </div>
            <button
              type="submit"
              className="tp-return-customer-btn tp-checkout-btn"
            >
              Aplicar
            </button>
          </form>
          {couponApplyMsg && <p className="p-2" style={{color:'green'}}>{couponApplyMsg}</p>}
        </div>
      )}
    </div>
  );
};

export default CheckoutCoupon;
