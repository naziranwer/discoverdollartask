import React, { useState, useEffect } from "react";
import { categories } from "../utils/data";
import ProductCard from "./Card"; // Assuming the path to ProductCard is correctly defined
import { useDispatch } from "react-redux";
import { addSelectedProducts } from "../redux/action";

const Header = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeSubSubcategory, setActiveSubSubcategory] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const dispatch = useDispatch();
  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
      setActiveSubcategory(null);
      setActiveSubSubcategory(null);
      setSelectedProducts([]);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(subcategory);
    setActiveSubSubcategory(null);
    setSelectedProducts(subcategory.products || []);
  };

  const handleSubSubcategoryClick = (subSubcategory) => {
    setActiveSubSubcategory(subSubcategory);
    setSelectedProducts(subSubcategory.products || []);
  };

  let leaveTimer;

  const handleCategoryMouseEnter = (categoryId) => {
    setActiveCategory(categoryId);
    clearTimeout(leaveTimer); // Clear the leave timer for categories
  };

  const handleCategoryMouseLeave = () => {
    leaveTimer = setTimeout(() => {
      setActiveCategory(null);
    }, 2000); // Set a small delay before triggering category leave
  };

  const handleSubcategoryMouseEnter = (subcategory) => {
    setActiveSubcategory(subcategory);
    clearTimeout(leaveTimer);
  };

  const handleSubcategoryMouseLeave = () => {
    leaveTimer = setTimeout(() => {
      setActiveSubcategory(null);
    }, 2000); // Set a small delay before triggering leave
  };

  // Similar handlers for sub-subcategory
  const handleSubSubcategoryMouseEnter = (subSubcategory) => {
    setActiveSubSubcategory(subSubcategory);
    clearTimeout(leaveTimer); // Clear the leave timer when entering
  };

  const handleSubSubcategoryMouseLeave = () => {
    leaveTimer = setTimeout(() => {
      setActiveSubSubcategory(null);
    }, 2000); // Set a small delay before triggering leave
  };

  useEffect(() => {
    if (selectedProducts.length > 0) {
      dispatch(addSelectedProducts(selectedProducts));
    }
  }, [dispatch, selectedProducts]);

  return (
    <div className="bg-white p-4 flex justify-center gap-2">
      {categories.map((category) => (
        <div key={category.id} className="relative">
          <button
            onClick={() => handleCategoryClick(category.id)}
            onMouseEnter={() => handleCategoryMouseEnter(category.id)}
            onMouseLeave={() => handleCategoryMouseLeave(null)}
            className={`text-black bg-white hover:bg-gray-200   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              activeCategory === category.id ? "font-bold" : ""
            }`}
            type="button"
          >
            {category.name}{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {activeCategory === category.id && category.subcategories && (
            <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <button
                      onClick={() => handleSubcategoryClick(subcategory)}
                      onMouseEnter={() =>
                        handleSubcategoryMouseEnter(subcategory)
                      }
                      onMouseLeave={() => handleSubcategoryMouseLeave(null)}
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                        activeSubcategory === subcategory ? "font-bold" : ""
                      }`}
                    >
                      {subcategory.name}
                    </button>
                    {activeSubcategory === subcategory &&
                      subcategory.subcategories && (
                        <ul>
                          {subcategory.subcategories.map((subSubcategory) => (
                            <li key={subSubcategory.id}>
                              <button
                                onClick={() =>
                                  handleSubSubcategoryClick(subSubcategory)
                                }
                                onMouseEnter={() =>
                                  handleSubSubcategoryMouseEnter(subSubcategory)
                                }
                                onMouseLeave={() =>
                                  handleSubSubcategoryMouseLeave(null)
                                }
                                className={`block px-8 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                                  activeSubSubcategory === subSubcategory
                                    ? "font-bold"
                                    : ""
                                }`}
                              >
                                {subSubcategory.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;
