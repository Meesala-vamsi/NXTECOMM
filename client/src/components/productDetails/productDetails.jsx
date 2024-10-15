import React from 'react'
import "./productDetails.css"
import { useParams } from 'react-router-dom'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const ProductDetails = ({ product, onClose, onClickAddToCart }) => {
  return (
    <div className="details-overlay" onClick={onClose}>
      <div className="details-content" onClick={(e) => e.stopPropagation()}>
        <button className="details-close" onClick={onClose}>
          X
        </button>
        <div className="items-alignment">
          <img
            src={product.image}
            alt={product.title}
            className="details-image"
          />
          <div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <div className="price-container">
              <p className="original-price">
                ${(product?.price + 10).toFixed(2)}
              </p>
              <p className="product-price">${product?.price}</p>
            </div>
            <div className="rating-container">
              <div>
                {[...Array(5)].map((star, idx) => {
                  const currentRating = product?.rating?.rate;
                  if (idx < Math.floor(currentRating)) {
                    return (
                      <FaStar
                        key={idx}
                        size={20}
                        className="star"
                        color="#ffc107"
                      />
                    );
                  } else if (
                    idx === Math.floor(currentRating) &&
                    currentRating % 1 !== 0
                  ) {
                    return (
                      <FaStarHalfAlt
                        key={idx}
                        size={20}
                        className="star"
                        color="#ffc107"
                      />
                    );
                  } else {
                    return (
                      <FaStar
                        key={idx}
                        size={20}
                        className="star"
                        color="#e4e5e9"
                      />
                    );
                  }
                })}
              </div>

              <p className="total-reviews">{product?.rating?.count} reviews</p>
            </div>
            <button style={{color:"#fff"}} onClick={()=>{onClickAddToCart(product)}}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails