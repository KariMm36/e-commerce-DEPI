import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CategoryMenu = () => {
  return (
    <div className="border-end pe-3">
      <ul className="list-unstyled lh-lg">

        <li className="d-flex justify-content-between align-items-center">
          Woman's Fashion <FaChevronRight size={12} />
        </li>

        <li className="d-flex justify-content-between align-items-center">
          Men's Fashion <FaChevronRight size={12} />
        </li>

        <li className="mt-2">Electronics</li>
        <li className="mt-2">Home & Lifestyle</li>
        <li className="mt-2">Medicine</li>

        <li className="d-flex justify-content-between align-items-center mt-2">
          Sports & Outdoor <FaChevronRight size={12} />
        </li>

        <li className="mt-2">Baby’s & Toys</li>
        <li className="mt-2">Groceries & Pets</li>
        <li className="mt-2">Health & Beauty</li>

      </ul>
    </div>
  );
};

export default CategoryMenu;
