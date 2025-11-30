import React, { useEffect, useState, useRef, useContext } from "react";
import { ShopContext } from "../Components/ShopContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../CSS/FlashSales.css";

import { MdFavorite } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import img1 from "../assets/prod (1).svg";
import img2 from "../assets/prod (2).svg";
import img3 from "../assets/prod (3).svg";
import img4 from "../assets/prod (4).svg";

const FlashSales = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  const { addToCart, addToWishlist, wishlist } = useContext(ShopContext);

  const API_URL = "http://localhost:5000/api/products"; // عدلي البورت لو الباك اند مش 3000

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error("خطأ في جلب البيانات");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error loading products", error);
      setProducts([
        // لو حصل خطأ، ممكن نعرض منتجات تجريبية بدل ما يبقى loading عالق
        { id: 1, title: "HAVIT HV-G92 Gamepad", price: 120, oldPrice: 160, discount: 40, rating: 4.5, image: img1 },
        { id: 2, title: "AK-900 Wired Keyboard", price: 960, oldPrice: 1160, discount: 35, rating: 3.5, image: img2 },
        { id: 3, title: "IPS LCD Gaming Monitor", price: 370, oldPrice: 400, discount: 30, rating: 5, image: img3 },
        { id: 4, title: "Comfort Chair", price: 375, oldPrice: 400, discount: 25, rating: 4, image: img4 },
      ]);
    } finally {
      setLoading(false); // 🔹 مهم جدًا لإيقاف الـ Loading مهما حصل
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return "★".repeat(full) + "☆".repeat(empty);
  };

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 35);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) return clearInterval(interval);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container my-5 ms-3 flash-container">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3 w-100">
        <div className="d-flex flex-column">
          <p className="cat-label mb-1">Today’s</p>
          <h4 className="fw-bold mb-0">Flash Sales</h4>
        </div>

        {/* TIMER */}
        <div className="d-flex timer-box mx-4">
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item, index) => (
            <div key={index} className="d-flex flex-column align-items-center mx-2 timer-item">
              <small className="timer-label">{item.label}</small>
              <strong className="timer-value">{item.value < 10 ? `0${item.value}` : item.value}</strong>
            </div>
          ))}
        </div>

        {/* ARROWS */}
        <div className="d-flex gap-2">
          <button className="btn btn-light shadow-sm" onClick={() => swiperRef.current?.slidePrev()}>
            <FaArrowLeft />
          </button>
          <button className="btn btn-light shadow-sm" onClick={() => swiperRef.current?.slideNext()}>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* SWIPER */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            576: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            992: { slidesPerView: 4, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="product-card rounded-3 shadow-sm overflow-hidden">
                <div className="image-box position-relative">
                  <div className="position-absolute top-0 end-0 p-2 d-flex flex-column gap-2 icons-wrapper">
                    <button
                      className="bg-white border-0 rounded-circle p-2 shadow-sm icon-btn"
                      onClick={() => addToWishlist(product)}
                    >
                      <MdFavorite
                        size={20}
                        style={{ color: wishlist.some(p => p.id === product.id) ? 'red' : 'black' }}
                      />
                    </button>

                    <button className="bg-white border-0 rounded-circle p-2 shadow-sm icon-btn">
                      <IoEyeOutline size={20} />
                    </button>
                  </div>

                  <span className="badge bg-danger position-absolute top-0 start-0 m-2">
                    -{product.discount}%
                  </span>

                  <img src={product.image} alt={product.title} className="product-img" />
                </div>

                <div className="info-box p-3 text-left">
                  <h6 className="mt-2">{product.title}</h6>

                  <div className="d-flex gap-2">
                    <span className="fw-bold text-danger">${product.price}</span>
                    <span className="text-muted text-decoration-line-through">${product.oldPrice}</span>
                  </div>

                  <div className="text-warning small mt-1">
                    {renderStars(product.rating)}
                    <span className="text-dark"> ({product.rating})</span>
                  </div>

                  <button
                    className="btn btn-dark w-100 mt-3 add-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart className="me-2" /> Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="text-center mt-4">
        <Link to="/products" className="btn btn-danger px-4 py-2 view-products-btn">
          View All Products
        </Link>
      </div>

    </div>
  );
};

export default FlashSales;
