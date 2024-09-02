'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// internal
import ErrorMsg from "../common/error-msg";
import { notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().required().label("Subject"),
  message: Yup.string().required().label("Subject"),
  remember: Yup.bool()
    .oneOf([true], "You must agree to the terms and conditions to proceed.")
    .label("Terms and Conditions"),
});

const ContactForm = () => {

    // react hook form
    const {register,handleSubmit,formState: { errors },reset} = useForm({
      resolver: yupResolver(schema),
    });
    // on submit
    const onSubmit = (data) => {
      if(data){
        notifySuccess('Message sent successfully!');
      }

      reset();
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
      <div className="tp-contact-input-wrapper">
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input {...register("name", { required: `Name is required!` })} name="name" id="name" type="text" placeholder="Juan Perez" />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="name">Tu nombre</label>
          </div>
          <ErrorMsg msg={errors.name?.message} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input {...register("email", { required: `Email is required!` })} name="email" id="email" type="email" placeholder="correo@mail.com" />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input {...register("subject", { required: `Subject is required!` })} name="subject" id="subject" type="text" placeholder="escribe el asunto" />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="subject">Asunto</label>
          </div>
          <ErrorMsg msg={errors.subject?.message} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <textarea {...register("message", { required: `Message is required!` })} id="message" name="message" placeholder="Escribe el mensaje aqui..."/>
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="message">Mensaje</label>
          </div>
          <ErrorMsg msg={errors.message?.message} />
        </div>
      </div>
      <div className="tp-contact-btn">
        <button type="submit">Enviar mensaje</button>
      </div>
    </form>
  );
};

export default ContactForm;