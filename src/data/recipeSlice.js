import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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


export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id, { getState }) => {
    const local = getState().recipes.recipes.find(
      r => r.idMeal === id
    );
    if (local) return local;

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
    addRecipe: (state, action) => {
      state.recipes.unshift(action.payload);
    },
    deleteRecipie:(state,action)=>{
      const id=action.payload;

      state.recipes=state.recipes.filter(recipe=>recipe.idMeal !==id);
      state.favorites=state.favorites.filter(favId =>favId != id);

      if(state.selectedRecipe?.idMeal ===id){
        state.selectedRecipe =null;
      }

    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      state.favorites.includes(id)
        ? (state.favorites = state.favorites.filter(f => f !== id))
        : state.favorites.push(id);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRecipes.pending, state => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;

      
      const existingRecipes = state.recipes || [];

     
      const localRecipes = existingRecipes.filter(
        (r) => typeof r.idMeal === "string"
      );

      const apiRecipes = action.payload || [];

     
      state.recipes = [...localRecipes, ...apiRecipes];
    })

    .addCase(fetchRecipes.rejected, (state) => {
      state.loading = false;
    })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      });
  },
});

export const { addRecipe, toggleFavorite,deleteRecipie } = recipeSlice.actions;
export default recipeSlice.reducer;
