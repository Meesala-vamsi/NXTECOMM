import React from "react";
import "./productList.css";
import { useDispatch } from "react-redux";
import { productDetails } from "../../store/slices/productSlice";
import cookies from "js-cookie";
import { useLocation } from "react-router-dom";


const ProductList = ({ products, handleProductClick, onClickAddToCart }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = cookies.get("token");
  let categoryType = "";
  if (products?.category === "men's clothing") {
    categoryType = "Men";
  } else if (products?.category === "women's clothing") {
    categoryType = "Women";
  } else {
    categoryType =
      products?.category[0].toUpperCase() + products?.category.slice(1);
  }

  const onClickProduct = (id) => {
    dispatch(productDetails({ id }));
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
      onClickAddToCart(product);
  };

  return (
    <li
      className="product-list-items"
      onClick={() => {
        onClickProduct(products?.id), handleProductClick(products);
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={products?.image}
          alt={products?.title}
          className="product-image"
        />

        <div className="category">
          <p>{categoryType}</p>
        </div>
      </div>
      <div className="card-bottom-section">
        <h1>{products?.title}</h1>
        <div className="price-container">
          <p className="original-price">${(products?.price + 10).toFixed(2)}</p>
          <p className="product-price">${products?.price}</p>
        </div>
      </div>
      {
        location.pathname.includes("products")?<button className="add-cart-btn" onClick={(e) => addToCart(e, products)}>
        Add to cart
      </button>:""
      }
    </li>
  );
};

export default ProductList;
