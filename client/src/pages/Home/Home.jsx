import React, { useEffect, useState } from 'react'
import "./Home.css"
import banner6 from "../../assets/home-banner6.webp";
import banner2 from "../../assets/home-banner2.webp";
import banner3 from "../../assets/home-banner3.webp";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

import { MdDashboard, MdDevices } from "react-icons/md";
import { GiJewelCrown } from 'react-icons/gi';
import { FaFemale, FaMale } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getCategoryData } from '../../store/slices/productSlice';
import ProductList from '../../components/productList/productList';
import { toast } from 'react-toastify';
const category = [
  {
    id: "electronics",
    name: "Electronics",
    logo: <MdDevices className="category-icon" />,
    path: "/products",
  },
  {
    id: "jewelery",
    name: "Jewelery",
    logo: <GiJewelCrown className="category-icon" />,
    path: "/products",
  },
  {
    id: "men's clothing",
    name: "Mens",
    logo: <FaMale className="category-icon" />,
    path: "/products",
  },
  {
    id: "women's clothing",
    name: "Womens",
    logo: <FaFemale className="category-icon" />,
    path: "/products",
  },
];

const Home = () => {

  const slides = [banner6, banner2, banner3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const {productsList,isLoading} = useSelector((state)=>state.products);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 5000);

      return () => clearInterval(timer);
    }, []);

    useEffect(()=>{
      dispatch(getAllProducts());
    },[dispatch]);

   const onClickAddToCart=()=>{}

    const handleProductClick=()=>{}

  if (isLoading) {
    return (
      <div>
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="slide-container">
        {slides.map((eachSlide, index) => (
          <img
            src={eachSlide}
            key={index}
            alt={eachSlide}
            className={`${
              index === currentSlide ? "on-currenstslide" : "off-currentslide"
            } common-image-styles`}
          />
        ))}

        <div
          className={`${
            currentSlide === 2
              ? "slide-manager on-text-alignment"
              : "slide-manager off-text-alignment"
          } common-slide-manager`}
        >
          <h1 className="banner-heading">
            Get your <br /> Fashion Style
          </h1>
          <div className="description-container">
            <p>
              Shop the latest clothing, shoes, and handbags <br /> from top
              fashion brands, style icons, and celebrities.
            </p>
          </div>
          <div className="mt-0">
            <button
              className="shop-now-btn"
              onClick={() => navigate("/products")}
            >
              SHOP NOW
            </button>
          </div>
        </div>

        <button
          className="arrow left-arrow"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <SlArrowLeft style={{ color: "black" }} />
        </button>
        <button
          className="arrow right-arrow"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <SlArrowRight style={{ color: "black" }} />
        </button>
      </div>
      <div className="categories-container">
        <h1 className="category-heading">Shop by Category</h1>
        <div className="category-list-container">
          <Link to="/products" className="nav-link category-list-item">
            <MdDashboard className="category-icon" />
            <h1>Products</h1>
          </Link>
          {category.map((eachCategory,index) => (
            <Link
              className="category-list-item nav-link"
              to={eachCategory.path}
              key={index}
              onClick={() =>
                dispatch(getCategoryData({ category: eachCategory.id }))
              }
            >
              {eachCategory.logo}
              <h1>{eachCategory.name}</h1>
            </Link>
          ))}
        </div>
      </div>
      <div className='home-products'>
        <h1 style={{ fontSize: "25px" }}>Featured products</h1>
        <ul className="product-list-container">
          {productsList?.slice(0,15).map((eachProduct, index) => (
            <ProductList
              key={index}
              products={eachProduct}
              handleProductClick={handleProductClick}
              onClickAddToCart={onClickAddToCart}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home