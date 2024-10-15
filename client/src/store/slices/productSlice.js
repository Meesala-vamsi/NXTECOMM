import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
  productsList:null,
  productDetails:null,
  isLoading:true,
  cartDataList:null
};

export const getAllProducts = createAsyncThunk("/products",
  async()=>{
    const response = await axios.get("https://fakestoreapi.com/products");
    return JSON.parse(JSON.stringify(response.data));
  }
);

export const productDetails = createAsyncThunk("/productDetails",
  async ({id})=>{
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return JSON.parse(JSON.stringify(response.data));
  }
)

export const getCategoryData = createAsyncThunk("/getCategoryData",
  async({category})=>{
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );

    return JSON.parse(JSON.stringify(response.data));
  }
)



const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setFilteredProducts: (state, action) => {
      state.productsList = action.payload;
    },
    setCartDetails:(state,action)=>{
      state.cartDataList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productsList = null;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload;
      })
      .addCase(getCategoryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload;
      });
  },
});

export const { setFilteredProducts,setCartDetails } = productSlice.actions;
export default productSlice.reducer;
