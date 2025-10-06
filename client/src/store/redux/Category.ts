import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { category } from "../../utils/Type";
export const getCategory = createAsyncThunk("getCategory", async () => {
  try {
    const res = await axios.get("http://localhost:8080/categorys");
  
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const addCategory = createAsyncThunk("addCategory", async (category) => {
  try {
    console.log(category);
    const res = await axios.post("http://localhost:8080/categorys",category);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const editCategory = createAsyncThunk("editCategory", async (category:category) => {
  try {
    console.log(category);
    const res = await axios.put(`http://localhost:8080/categorys/${category.id}`,category);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteCategory = createAsyncThunk("deleteCategory", async (id:number) => {
  try {
    console.log(category);
    const res = await axios.delete(`http://localhost:8080/categorys/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
const State:category[] =[]
const category = createSlice({
  name: "category",
  initialState: {
    category: State,
  },
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    })
    build.addCase(addCategory.fulfilled, (state, action) => {
    
        const newCategory:category = action.payload as category
        state.category.push(newCategory)
    });
    build.addCase(deleteCategory.fulfilled, (state, action) => {
    
        const idx = state.category.findIndex((item:category)=>item.id === action.payload.id)
        state.category.splice(idx,1)
    });
    build.addCase(editCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        const idx = state.category.findIndex((item:category)=>item.id === action.payload.id)
        state.category[idx] = action.payload
    });
  },
});

export default category.reducer;

