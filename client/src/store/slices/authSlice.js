import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
  token:"",
  isLoading:true
}

export const login = createAsyncThunk("/login",
  async(formData)=>{
    const response = await axios.post("https://fakestoreapi.com/auth/login",formData);
    return JSON.parse(JSON.stringify(response.data));
  }
)

const authSlice=createSlice({
  name:"authSlice",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(login.pending,(state)=>{
      state.isLoading=false;
    })
    builder.addCase(login.fulfilled, (state,action) => {
      state.isLoading = false;
    })
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
  }
})

export default authSlice.reducer;