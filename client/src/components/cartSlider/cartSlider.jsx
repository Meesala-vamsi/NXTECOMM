import React from 'react';
import './cartSlider.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCartDetails } from '../../store/slices/productSlice';
import { toast } from 'react-toastify';

const CartSlider = ({ isOpen, closeCart }) => {

  const { cartDataList } = useSelector((state) => state.products);
  const dispath = useDispatch();

  const onClickRemove=(item)=>{
    const removeData = cartDataList?.filter((eachItem)=>(
      eachItem.id !== item
    ));

    dispath(setCartDetails(removeData));
    toast.success("Item removed from cart.")

    
  }
  return (
    <>
      {isOpen && <div className="backdrop" onClick={closeCart}></div>}
      <div className={`cartslider-container ${isOpen ? "open" : ""}`}>
        <button className="close-button" onClick={closeCart}>
          x
        </button>
        <h2>Your Cart</h2>
        {cartDataList?.length === 0 ? (
          <p style={{textAlign:"center",marginTop:"40px",fontWeight:"bold",fontSize:"20px"}}>Add items to cart</p>
        ) : (
          <ul className="cart-list-container">
            {cartDataList?.map((eachCart, index) => (
              <li key={index} className="cart-list-item">
                <img
                  src={eachCart?.image}
                  alt={eachCart?.title}
                  className="cart-image"
                />
                <div className="cart-description-container">
                  <div className="cart-sub-container">
                    <p className="cart-title">{eachCart?.title}</p>
                    <p>${eachCart?.price}</p>
                  </div>
                  <p>Quantity: {eachCart?.quantity}</p>
                  <button
                    className="cart-btn"
                    onClick={() => onClickRemove(eachCart?.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default CartSlider