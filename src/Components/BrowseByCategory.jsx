import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "../CSS/categories.css";

import img1 from "../assets/category (1).svg";
import img2 from "../assets/category (2).svg";
import img3 from "../assets/category (3).svg";
import img4 from "../assets/category (4).svg";
import img5 from "../assets/category (5).svg";
import img6 from "../assets/category (6).svg";


const categories = [
  { name: "Phones", image: img1 },
  { name: "Computers", image: img2 },
  { name: "SmartWatch", image: img3 },
  { name: "Camera", image: img4 },
  { name: "HeadPhones", image: img5 },
  { name: "Gaming", image: img6 },
];

const BrowseByCategory = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="browse-category">
      <div className="category-header">
        <div>
          <p className="cat-label">Categories</p>
          <h3 className="section-title">Browse By Category</h3>
        </div>

        <div className="arrows">
          <button ref={prevRef} className="arrow-btn shadow-sm ">
            <FaArrowLeft />
          </button>
          <button ref={nextRef} className="arrow-btn shadow-sm">
            <FaArrowRight />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={5}
         breakpoints={{
         400: { slidesPerView: 1.7 },
         740: { slidesPerView: 2.5 },
         990: { slidesPerView: 4 },
        1024: { slidesPerView: 6 },
  }}
        spaceBetween={20}
        modules={[Navigation]}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="category-slider"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.name}>
            <div className="category-card">
              <img src={cat.image} alt={cat.name} className="icon-img" />
              <span className="name">{cat.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BrowseByCategory;
