import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch all recipes
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await res.json();
    return data.meals;
  }
);

// fetch single recipe
export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data.meals[0];
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
    toggleFavorite: (state, action) => {
      const id = action.payload;
      state.favorites.includes(id)
        ? (state.favorites = state.favorites.filter(f => f !== id))
        : state.favorites.push(id);
    },
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
      });
  },
});

export const { toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
