'use client';
import React from "react";
import ErrorMsg from "../common/error-msg";
import { useSelector } from "react-redux";

const CheckoutBillingArea = ({ register, errors }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="tp-checkout-bill-area">
      <h3 className="tp-checkout-bill-title">Detalle de pago</h3>

      <div className="tp-checkout-bill-form">
        <div className="tp-checkout-bill-inner">
          <div className="row">
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  Nombre <span>*</span>
                </label>
                <input
                  {...register("firstName", {
                    required: `firstName is required!`,
                  })}
                  name="firstName"
                  id="firstName"
                  type="text"
                  placeholder="Juan"
                  defaultValue={user?.firstName}
                />
                <ErrorMsg msg={errors?.firstName?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>
                  Apellido <span>*</span>
                </label>
                <input
                  {...register("lastName", {
                    required: `lastName is required!`,
                  })}
                  name="lastName"
                  id="lastName"
                  type="text"
                  placeholder="Perez"
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Region <span>*</span>
                </label>
                <input
                  {...register("country", { required: `country is required!` })}
                  name="country"
                  id="country"
                  type="text"
                  placeholder="Metropolitana"
                />
                <ErrorMsg msg={errors?.lastName?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Calle</label>
                <input
                  {...register("address", { required: `Calle es requerido` })}
                  name="address"
                  id="address"
                  type="text"
                  placeholder="Calle 123"
                />
                <ErrorMsg msg={errors?.address?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Ciudad</label>
                <input
                  {...register("city", { required: `City is required!` })}
                  name="city"
                  id="city"
                  type="text"
                  placeholder="Ciudad"
                />
                 <ErrorMsg msg={errors?.city?.message} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="tp-checkout-input">
                <label>Codigo postal</label>
                <input
                  {...register("zipCode", { required: `zipCode is required!` })}
                  name="zipCode"
                  id="zipCode"
                  type="text"
                  placeholder="Codigo postal"
                />
                <ErrorMsg msg={errors?.zipCode?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Celular <span>*</span>
                </label>
                <input
                  {...register("contactNo", {
                    required: `ContactNumber is required!`,
                  })}
                  name="contactNo"
                  id="contactNo"
                  type="text"
                  placeholder="Celular"
                />
                <ErrorMsg msg={errors?.contactNo?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>
                  Correo electronico <span>*</span>
                </label>
                <input
                  {...register("email", { required: `Email is required!` })}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
                <ErrorMsg msg={errors?.email?.message} />
              </div>
            </div>
            <div className="col-md-12">
              <div className="tp-checkout-input">
                <label>Notas (Opcional)</label>
                <textarea
                  {...register("orderNote", { required: false })}
                  name="orderNote"
                  id="orderNote"
                  placeholder="Notes about your order, e.g. special notes for delivery."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutBillingArea;
