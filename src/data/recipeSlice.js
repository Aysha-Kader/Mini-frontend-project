import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




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

const recipeMetadata={
  "52772":{cookTime:25,difficulty:"Easy",diet:"Non-veg"},
  "52884":{cookTime:25,difficulty:"Medium",diet:"veg"},


  "52768":{cookTime:35,difficulty:"Easy",diet:"Non-veg"},
  "52893":{cookTime:25,difficulty:"Hard",diet:"Non-veg"},
  "52918":{cookTime:25,difficulty:"Hard",diet:"Non-veg"},
}

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    selectedRecipe: null,
    favorites: [],
    loading: false,
  },

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

        const apiRecipes=(action.payload||[]).map(r=>({
          ...r,
          ...recipieMetadata[r.idMeal],
        }));

       
        state.recipes = [...localRecipes, ...action.payload];
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
