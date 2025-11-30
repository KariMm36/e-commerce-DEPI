import React from "react";
import ProductCard from "./ProductCard";
import '../CSS/productCard.css'

import img1 from "../assets/Best (1).svg";
import img2 from "../assets/Best (2).svg";
import img3 from "../assets/Best (3).svg";
import img4 from "../assets/Best (4).svg";

const products = [
  {
    id: 1,
    name: "The north coat",
    price: 260,
    oldPrice: 360,
    image: img4,
    reviews: 65,
  },
  {
    id: 2,
    name: "Gucci duffle bag",
    price: 960,
    oldPrice: 1160,
    image: img3,
    reviews: 65,
  },
  {
    id: 3,
    name: "RGB liquid CPU Cooler",
    price: 160,
    oldPrice: 170,
    image: img2,
    reviews: 65,
  },
  {
    id: 4,
    name: "Small BookSelf",
    price: 360,
    oldPrice: 360,
    image: img1,
    reviews: 65,
  },
];

const BestSelling = () => {
  return (
    <div className="container my-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <span className="text-danger fw-semibold">This Month</span>
          <h2 className="fw-bold mt-1">Best Selling Products</h2>
        </div>

        <button className="btn btn-danger px-4">View All</button>
      </div>

      {/* Products */}
      <div className="row g-4">
        {products.map((item) => (
          <div className="col-6 col-md-3" key={item.id}>
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSelling;
