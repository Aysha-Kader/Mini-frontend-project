import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../data/recipeSlice";
import authReducer from "../data/authSlice";

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    auth: authReducer,
  },
});

export default store;