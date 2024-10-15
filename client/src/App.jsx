import React, { useEffect, useState } from 'react'
import "./App.css"
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom'
import Products from './pages/Products/products'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import { ToastContainer } from "react-toastify";
import cookies from "js-cookie";
import ProductDetails from './components/productDetails/productDetails'
import { useSelector } from 'react-redux';

const App = () => {
  const [token,setToken] = useState(cookies.get("token"));
  useEffect(()=>{
    console.log("component rendered")
  },[cookies.get("token")]);
  return (
    <div>
      <ToastContainer/>
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products token={token} />} />
      </Routes>
    </div>
  );
}

export default App