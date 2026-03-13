import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/api.js";

// FETCH ALL RECIPES FROM BACKEND
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {

    const res = await API.get("/recipes");

    return res.data; // recipes from database
  }
);

// FETCH SINGLE RECIPE
export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id) => {

    const res = await API.get(`/recipes/${id}`);

    return res.data;
  }
);

// CREATE NEW RECIPE
export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (recipeData) => {

    const token = localStorage.getItem("token");

    const res = await API.post(
      "/recipes/create",
      recipeData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return res.data;
  }
);

// DELETE RECIPE
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {

    const token = localStorage.getItem("token");

    await API.delete(`/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return id;
  }
);

const recipeSlice = createSlice({
  name: "recipes",

  initialState: {
    recipes: [],
    selectedRecipe: null,
    favorites: [],
    loading: false,
  },

  reducers: {

    // TOGGLE FAVORITE
    toggleFavorite: (state, action) => {

      const id = action.payload;

      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(f => f !== id);
      } else {
        state.favorites.push(id);
      }

    },

  },

  extraReducers: (builder) => {

    builder

      // FETCH ALL RECIPES
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })

      // FETCH SINGLE RECIPE
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })

      // CREATE RECIPE
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })

      // DELETE RECIPE
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(
          recipe => recipe._id !== action.payload
        );
      });

  },
});

export const { toggleFavorite } = recipeSlice.actions;

export default recipeSlice.reducer;