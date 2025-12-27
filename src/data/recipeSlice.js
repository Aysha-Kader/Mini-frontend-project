import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* =======================
   FETCH ALL RECIPES
======================= */
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const data = await res.json();
    return data.meals || [];
  }
);

/* =======================
   FETCH RECIPE BY ID
   (checks local first)
======================= */
export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id, { getState }) => {
    const localRecipe = getState().recipes.recipes.find(
      r => r.idMeal === id
    );

    if (localRecipe) return localRecipe;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  }
);

/* =======================
   SLICE
======================= */
const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    selectedRecipe: null,
    favorites: [],
    loading: false,
  },

  reducers: {
    /* ADD RECIPE */
    addRecipe: (state, action) => {
      state.recipes.unshift({
        ...action.payload,
        isLocal: true, // 🔑 VERY IMPORTANT
      });
    },

    /* DELETE RECIPE */
    deleteRecipie: (state, action) => {
      const id = action.payload;

      state.recipes = state.recipes.filter(
        recipe => recipe.idMeal !== id
      );

      state.favorites = state.favorites.filter(
        favId => favId !== id
      );

      if (state.selectedRecipe?.idMeal === id) {
        state.selectedRecipe = null;
      }
    },

    /* TOGGLE FAVORITE */
    toggleFavorite: (state, action) => {
      const id = action.payload;

      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(f => f !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },

  extraReducers: builder => {
    builder
      /* FETCH ALL */
      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
      })

      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ keep ONLY user-added recipes
        const localRecipes = state.recipes.filter(
          r => r.isLocal === true
        );

        // ✅ replace API recipes (no duplicates)
        state.recipes = [...localRecipes, ...action.payload];
      })

      .addCase(fetchRecipes.rejected, state => {
        state.loading = false;
      })

      /* FETCH BY ID */
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      });
  },
});

export const {
  addRecipe,
  deleteRecipie,
  toggleFavorite,
} = recipeSlice.actions;

export default recipeSlice.reducer;
