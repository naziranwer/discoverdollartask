import React from "react";
import { useSelector } from "react-redux";

const ProductCard = () => {
  

  const products=useSelector((state)=> state.selectedProducts.products);
  console.log("products in card.js", products);
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {products?.map((product) => {
        const { title, price, discountPercentage, rating, images } = product;
        const discountedPrice = price - (price * discountPercentage) / 100;

        return (
          <div key={product.id} className=" w-64 rounded overflow-hidden shadow-lg">
            <img className="w-full" src={images[0]} alt={title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{title}</div>
              <p className="text-gray-700 text-base">
                Price: ${price.toFixed(2)}
              </p>
              <p className="text-gray-700 text-base">
                Discounted Price: ${discountedPrice.toFixed(2)}
              </p>
              <p className="text-gray-700 text-base">Rating: {rating}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
