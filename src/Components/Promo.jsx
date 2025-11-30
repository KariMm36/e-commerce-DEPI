import React from "react";
import speaker from "../assets/speaker.svg"; 
import "../CSS/Promo.css";

const PromoSection = () => {
  return (
    <section className="promo-section container my-5 d-flex align-items-center justify-content-between flex-wrap">

      <div className="promo-text ms-5">
        <h5 className=" fw-bold">Categories</h5>

        <h1 className="fw-bold promo-title">
          Enhance Your <br /> Music Experience
        </h1>

        <div className="d-flex gap-3 my-4">
          <div className="count-box">23<br/><span>Hours</span></div>
          <div className="count-box">05<br/><span>Days</span></div>
          <div className="count-box">59<br/><span>Minutes</span></div>
          <div className="count-box">35<br/><span>Seconds</span></div>
        </div>

        <button className="btn px-4 py-2 fw-semibold">
          Buy Now!
        </button>
      </div>

      <div className="promo-img me-5">
        <img src={speaker} alt="Speaker" />
      </div>
    </section>
  );
};

export default PromoSection;
