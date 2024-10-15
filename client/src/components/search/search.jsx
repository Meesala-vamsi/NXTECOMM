import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredProducts } from '../../store/slices/productSlice';
import { IoSearch } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';
import "./search.css";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [originalProductsList, setOriginalProductsList] = useState([]);
  const { productsList } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();

    useEffect(() => {
      if (productsList && originalProductsList.length === 0) {
        setOriginalProductsList(productsList);
      }
    }, [productsList]);
    const onClickSearch = () => {
      if (searchValue.trim() === "") {
        dispatch(setFilteredProducts(originalProductsList));
      } else {
        const filteredData = originalProductsList?.filter((eachProduct) =>
          eachProduct?.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        dispatch(setFilteredProducts(filteredData));
      }
    };

    const onChangeInput = (event) => {
      setSearchValue(event.target.value);
      if (event.target.value === "") {
        dispatch(setFilteredProducts(originalProductsList));
      }
    };
  return (
    <div>
      {location.pathname.includes("products") ? (
        <div className="search-container">
          <input
            type="search"
            className="input-element"
            value={searchValue}
            placeholder="Search..."
            onChange={onChangeInput}
          />
          <div className="search-icon-container" onClick={onClickSearch}>
            <IoSearch className="search-icon" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Search