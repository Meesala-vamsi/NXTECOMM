import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { toast } from "react-toastify";
import cookies from "js-cookie";

const Login = ({ onClose, setToken }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  };

  const onSubmitData = (event) => {
    event.preventDefault();
    dispatch(login(data)).then((response) => {
      if (response?.meta?.requestStatus === "fulfilled") {
        toast.success("LoggedIn Successfully...");
        setToken(cookies.set("token", response?.payload?.token))
        cookies.set("token", response?.payload?.token);
        onClose()
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Login</h2>
        <form onSubmit={onSubmitData}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={data.username}
            placeholder="mor_2314 <- use this as username"
            onChange={onChangeInput}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={data.password}
            placeholder="83r5^_ <- use this as password"
            onChange={onChangeInput}
          />

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <button onClick={onClose} className="close-btn">
          X
        </button>
      </div>
    </div>
  );
};

export default Login;
 