import { configureStore } from "@reduxjs/toolkit";
import category from "./redux/Category"
import test from "./redux/Test"
const store = configureStore({
    reducer:{
        category,
        test
    }
})
export type RootState = ReturnType<typeof store.getState>;
export default store