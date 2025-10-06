import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Test } from "../../utils/Type";

export const getTest = createAsyncThunk("getTest", async () => {
  try {
    const res = await axios.get("http://localhost:8080/test");
    console.log(res.data);
    
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
export const deleteTest = createAsyncThunk("deleteTest", async (id:number) => {
  try {
    const res = await axios.delete(`http://localhost:8080/test/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});
const test = createSlice({
  name: "category",
  initialState: {
    test: [],
  },
  reducers: {},
  extraReducers: (build) => {
    build.addCase(getTest.fulfilled, (state, action) => {
      state.test = action.payload;
    })
    build.addCase(deleteTest.fulfilled, (state, action) => {
      const idx = state.test.findIndex((item:Test)=>item.id === action.payload.id)
      state.test.splice(idx,1)
    })

  },
});

export default test.reducer;

