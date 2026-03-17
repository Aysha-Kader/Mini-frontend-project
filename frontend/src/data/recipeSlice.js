import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../axios/api.js";

// FETCH ALL RECIPES FROM BACKEND
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const res = await API.get("/recipes");
    return res.data;
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
    const res = await API.post("/recipes/create", recipeData, {
      headers: { Authorization:` Bearer  ${token}` }
    });
    return res.data;
  }
);

// DELETE RECIPE
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id) => {
    const token = localStorage.getItem("token");
    await API.delete(`/recipes/${id}`, {
      headers: { Authorization:` Bearer ${token} `}
    });
    return id;
  }
);
//fetch user fav
export const fetchFavorites=createAsyncThunk("recipes/fetchFavorites",
  async() => {
    const token=localStorage.getItem("token");
    if(!token) return[];
    const res=await API.get("/favourites",{
      headers: { Authorization:` Bearer ${token} `},
    });
      return res.data;
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
    // Toggle favorite locally
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(f => f !== id);
      } else {
        state.favorites.push(id);
      }
    },
    // Set favorites from backend
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(r => r._id !== action.payload);
      })
      
      .addCase(fetchFavorites.fulfilled,(state,action)=>{
        state.favorites=action.payload.map(fav => fav._id);
      });
  },
});

export const { toggleFavorite, setFavorites } = recipeSlice.actions;
export default recipeSlice.reducer;