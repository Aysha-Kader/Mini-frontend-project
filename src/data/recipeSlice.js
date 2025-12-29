import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//  api

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
//  other values that api doesnt provide
const recipieMetadata = {
  "53322": { cookTime: 50, difficulty: "Medium", diet: "Veg" },
  "53254": { cookTime: 15, difficulty: "Easy", diet: "Vegan" },
  "53133": { cookTime: 75, difficulty: "Medium", diet: "Non-veg" },
  "53220": { cookTime: 120, difficulty: "Hard", diet: "Non-veg" },

  "53086": { cookTime: 20, difficulty: "Easy", diet: "Non-veg" },
  "53065": { cookTime: 45, difficulty: "Hard", diet: "Non-veg" },
  "53256": { cookTime: 10, difficulty: "Easy", diet: "Veg" },
  "53146": { cookTime: 90, difficulty: "Hard", diet: "Non-veg" },

  "53060": { cookTime: 45, difficulty: "Medium", diet: "Non-veg" },
  "52977": { cookTime: 25, difficulty: "Easy", diet: "Veg" },
  "53311": { cookTime: 60, difficulty: "Medium", diet: "Non-veg" },
  "53269": { cookTime: 15, difficulty: "Easy", diet: "Vegan" },

  "52978": { cookTime: 30, difficulty: "Easy", diet: "Veg" },
  "53216": { cookTime: 40, difficulty: "Medium", diet: "Veg" },
  "53026": { cookTime: 30, difficulty: "Medium", diet: "Vegan" },
  "53069": { cookTime: 35, difficulty: "Medium", diet: "Non-veg" },

  "53151": { cookTime: 60, difficulty: "Hard", diet: "Non-veg" },
  "53139": { cookTime: 25, difficulty: "Easy", diet: "Vegan" },
  "53310": { cookTime: 120, difficulty: "Hard", diet: "Veg" },
  "53013": { cookTime: 20, difficulty: "Easy", diet: "Non-veg" },

  "53266": { cookTime: 30, difficulty: "Medium", diet: "Vegan" },
  "52844": { cookTime: 60, difficulty: "Hard", diet: "Non-veg" },
  "52785": { cookTime: 25, difficulty: "Easy", diet: "Veg" },
  "53027": { cookTime: 45, difficulty: "Medium", diet: "Vegan" },
  "53027": { cookTime: 30, difficulty: "Easy", diet: "Veg" },

}
// slice
const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    selectedRecipe: null,
    favorites: [],
    loading: false,
  },
  // reducers
  reducers: {
    // add
    addRecipe: (state, action) => {
      state.recipes.unshift({
        ...action.payload,
        isLocal: true,
      });
    },

    // DELETE 
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

      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
      })

      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;


        const localRecipes = state.recipes.filter(
          r => r.isLocal === true
        );

        const apiRecipes = (action.payload || []).map(r => ({
          ...r,
          ...recipieMetadata[r.idMeal],
        }));


        state.recipes = [...localRecipes, ...apiRecipes];
      })

      .addCase(fetchRecipes.rejected, state => {
        state.loading = false;
      })


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
