import React, { useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getCategoryData, setCartDetails } from "../../store/slices/productSlice";
import ProductList from "../../components/productList/productList";
import ProductDetails from "../../components/productDetails/productDetails";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { GiJewelCrown } from "react-icons/gi";
import { MdDevices } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import Search from "../../components/search/search";
import cookies from "js-cookie";

const Products = ({token}) => {
  const dispatch = useDispatch();
  const { productsList, cartDataList,isLoading } = useSelector((state) => state.products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartData,setCartData] = useState([])

  const category = [
    {
      id: "electronics",
      name: "Electronics",
      logo: <MdDevices className="sidebar-logo" />,
    },
    {
      id: "jewelery",
      name: "Jewelery",
      logo: <GiJewelCrown className="sidebar-logo" />,
    },
    {
      id: "men's clothing",
      name: "Mens",
      logo: <FaMale className="sidebar-logo" />,
    },
    {
      id: "women's clothing",
      name: "Womens",
      logo: <FaFemale className="sidebar-logo" />,
    },
  ];

  const location = useLocation()

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(()=>{
    dispatch(setCartDetails(cartData))
  },[cartData,token])

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

    const onClickAddToCart = (cartItem) => {
      if(token !== undefined){
        setCartData((prevCartData) => {
          const isItemInCart = prevCartData.find(
            (item) => item.id === cartItem.id
          );

          if (isItemInCart) {
            return prevCartData.map((item) =>
              item.id === cartItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevCartData, { ...cartItem, quantity: 1 }];
          }
        });

        toast.success("Item added to cart..");
      }else{
        toast.error("Please login to add items in to cart.")
      }
    };


    const onClickCategory=(id)=>{
      dispatch(getCategoryData({category:id}))
    }

  if(isLoading){
    return(
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="products-container">
        <div
          className={
            location.pathname.includes("products") ? "sidebar-container" : ""
          }
        >
          <Link className="sidebar-item" to="/">
            <FaHome className="sidebar-logo" />
            <p>Home</p>
          </Link>

          <div
            className="sidebar-item"
            onClick={() => {
              dispatch(getAllProducts());
            }}
          >
            <MdDashboard className="sidebar-logo" />
            <p>Products</p>
          </div>

          {category.map((eachItem, index) => (
            <div
              className="sidebar-item"
              key={index}
              onClick={() => onClickCategory(eachItem.id)}
            >
              {eachItem.logo}
              <p>{eachItem.name}</p>
            </div>
          ))}
        </div>
        <div className="sub-container">
          <div>
            <h1>All Products</h1>
          </div>
          <div className="mobile-search">
            <Search />
          </div>
          <ul className="product-list-container">
            {productsList?.map((eachProduct, index) => (
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
      <div style={{ width: "100%" }}>
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClickAddToCart={onClickAddToCart}
            onClose={closeDetails}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
