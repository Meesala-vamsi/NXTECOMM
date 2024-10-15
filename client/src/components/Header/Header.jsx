import React, { useState, useEffect } from "react";
import "./Header.css";
import { FaFemale, FaMale, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryData, setFilteredProducts } from "../../store/slices/productSlice";
import CartSlider from "../cartSlider/cartSlider";
import { GiJewelCrown } from "react-icons/gi";
import { MdDevices } from "react-icons/md";
import Login from "../../pages/Login/Login";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import { IoIosMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import Search from "../search/search";
import { FaHome } from "react-icons/fa";

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

const Header = ({token,setToken}) => {
  const [searchValue, setSearchValue] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showMenu,setShowMenu] = useState(false);
  const {cartDataList} = useSelector((state)=>state.products);

  useEffect(()=>{
    console.log("Token Changed...");
  },[token]);

   const handleLoginClick = () => {
     setShowLoginPopup(true);
     setShowMenu(false);
     setToken(cookies.get("token"));
   };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };
  const location = useLocation()


  const onClickMenu=()=>{
    setShowMenu(true)
  }


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setShowMenu(false);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleLogoutClick=()=>{
    const isToken=cookies.remove("token")
    setToken(isToken);
    if(isToken === "" || isToken === undefined){
      toast.success("Logout successfully.");
    }else{
      toast.error("Something went wrong.please try again.")
    }
  }

  return (
    <>
      <header>
        <Link to="/" className="logo">
          <FaHome className="home-logo" />
          <h1>Ecomm</h1>
        </Link>
        <div className="header-center">
          {location.pathname.includes("products") ? (
            ""
          ) : (
            <>
              {location.pathname.includes("products") && (
                <Link to="/" className="nav-link">
                  Home
                </Link>
              )}
              <Link to="/products" className="nav-link header-products">
                Products
              </Link>
              {location.pathname.includes("products") ? (
                ""
              ) : (
                <div className="header-categories">
                  {category?.map((eachItem, index) => (
                    <Link
                      to="/products"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "black",
                        textDecoration: "none",
                      }}
                      key={index}
                      onClick={() =>
                        dispatch(getCategoryData({ category: eachItem.id }))
                      }
                    >
                      <p>{eachItem.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="desktop-search">
            <Search />
          </div>
        </div>

        <div className="header-right">
          <div className="cart-icon-container">
            <FaShoppingCart onClick={toggleCart} className="cart-icon" />
            <span className="cart-count">{cartDataList?cartDataList?.length:0}</span>
          </div>
          {token !== "" && token !== undefined ? (
            <button onClick={handleLogoutClick} className="login-button">
              Logout
            </button>
          ) : (
            <button onClick={handleLoginClick} className="login-button">
              Login
            </button>
          )}
          <div>
            {token !== "" && token !== undefined ? (
              <img
                src="https://res.cloudinary.com/db0f83m76/image/upload/v1711704711/unnamed_wfzswu.jpg"
                alt="profile"
                className="profile-image"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/db0f83m76/image/upload/v1708003261/blank-profile-picture-973460_1280_qwwp4w.png"
                alt="profile"
                className="profile-image"
              />
            )}
          </div>
          <IoIosMenu onClick={onClickMenu} className="menu-icon" />
        </div>
      </header>
      <CartSlider isOpen={isCartOpen} closeCart={closeCart} />
      {showLoginPopup && (
        <Login onClose={handleClosePopup} setToken={setToken} />
      )}

      {showMenu ? (
        <div className="menu-container">
          <IoCloseSharp
            className="close-icon"
            onClick={() => setShowMenu(false)}
          />
          <div className="mobile-categories">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link
              to="/products"
              className="nav-link"
              style={{ marginTop: "22px", marginBottom: "7px" }}
            >
              Products
            </Link>
            {category?.map((eachItem, index) => (
              <Link
                to="/products"
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "black",
                  textDecoration: "none",
                }}
                key={index}
                onClick={() =>
                  dispatch(getCategoryData({ category: eachItem.id }))
                }
              >
                <p>{eachItem.name}</p>
              </Link>
            ))}
          </div>
          <div>
            <FaShoppingCart onClick={toggleCart} className="mobile-cart-icon" />
            {token !== "" && token !== undefined ? (
              <button
                onClick={handleLogoutClick}
                className="mobile-login-button"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                className="mobile-login-button"
              >
                Login
              </button>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
