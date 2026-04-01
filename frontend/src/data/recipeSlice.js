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
      headers: { Authorization:`Bearer  ${token}` }
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
      headers: { Authorization:`Bearer ${token}`}
    });
    return id;
  }
);
//fetch user fav
export const fetchFavorites=createAsyncThunk("recipes/fetchFavorites",
  async() => {
    const token=localStorage.getItem("token");
    if(!token) return[];
    const res=await API.get("/favorites",{
      headers: { Authorization:`Bearer ${token}`},
    });
    
      return res.data;
  }
);

//update recipe
export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async ({ id, data }) => {
    const token = localStorage.getItem("token");

    const res = await API.put(`/recipes/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
  }
);


export const  addFeedback = createAsyncThunk(
  "recipes/addFeedback",
  async ({ recipeId, comment }, { rejectWithValue }) => {
    try {
      console.log(recipeId,comment);
      //send feedback to backend
      const res = await API.post(`/recipes/${recipeId}/feedback`,{comment});
        
      return res.data;//return new feedback
    } catch (error) {
      console.log("THUNK ERROR:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data);
    }
  }
);
//delete feedback
export const deleteFeedback = createAsyncThunk(
  "recipes/deleteFeedback",
  async ({ recipeId, feedbackId }) => {
    
    await API.delete(
      `/recipes/${recipeId}/feedback/${feedbackId}`,
    
    );

    return { recipeId, feedbackId };//return ids for state update
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],//all recepie
    selectedRecipe: null, //current
    favorites: [],
    loading: false,
  },
  reducers: {
    // Toggle favorite locally
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        //remove from fav
        state.favorites = state.favorites.filter(f => f !== id);
      } else {
        //add to fav
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
    //fetch all recipies
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      //fetch single recipe
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.selectedRecipe = action.payload;
      })
      //create 
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.recipes.unshift(action.payload);
      })
      //delete recipe
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.recipes = state.recipes.filter(r => r._id !== action.payload);
      })
      //update
           .addCase(updateRecipe.fulfilled, (state, action) => {
            state.selectedRecipe=action.payload;
            //update in list
  state.recipes = state.recipes.map(r =>
    r._id === action.payload._id ? action.payload : r
  );
})
//fetch fav
      .addCase(fetchFavorites.fulfilled,(state,action)=>{
        //store only ids
        state.favorites=action.payload.map(fav => fav._id);
      })
//add feedback
      .addCase(addFeedback.fulfilled, (state, action) => {
 if(state.selectedRecipe){
  state.selectedRecipe.feedbacks.push(action.payload);
 }
})
//delete feedback
.addCase(deleteFeedback.fulfilled, (state, action) => {
  if (state.selectedRecipe) {
    state.selectedRecipe.feedbacks =
      state.selectedRecipe.feedbacks.filter(
        (fb) => fb._id !== action.payload.feedbackId
      );
  }
});
  },
});

export const { toggleFavorite, setFavorites } = recipeSlice.actions;
export default recipeSlice.reducer;



      
    
