import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../data/recipeSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddRecipe = () => {

  // Get login status 
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Used to move to another page
  const navigate = useNavigate();

  // If user is not logged in, move to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Local state to store recipe form data
  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    area: "",
    ingredients: "",
    instructions: "",
    diet: "",         
  difficulty: "",  
  cookTime: ""  
  });

  // Handle  for all form fields
  const handleChange = (e) => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value // Update  field
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Convert ingredients string into array

    const ingredientsArr = recipe.ingredients.split(",");

    //  new recipe object
    const newRecipe = {
      idMeal: Date.now().toString(),
      isLocal: true,
      strMeal: recipe.name,
      strMealThumb: recipe.image,
      strArea: recipe.area,
      strInstructions: recipe.instructions,
      diet: recipe.diet,
    difficulty: recipe.difficulty,
    cookTime: Number(recipe.cookTime),
    };

    // Add ingredients 

    ingredientsArr.forEach((ing, i) => {
      newRecipe[`strIngredient${i + 1}`] = ing.trim();
    });

    // Saving recipe to Redux 
    dispatch(addRecipe(newRecipe));

    // Navigate to recipe details page
    navigate(`/recipes/${newRecipe.idMeal}`);
  };




return (
  // add recipie form
  <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-gray-100 flex items-center justify-center px-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">
        Add Your Recipe 🍽️
      </h2>

      <input
        name="name"
        placeholder="Recipe Name"
        className="w-full p-3 border rounded-lg"
        onChange={handleChange}
        required
      />

      <input
        name="image"
        placeholder="Image URL"
        className="w-full p-3 border rounded-lg"
        onChange={handleChange}
        required
      />

      <input
        name="area"
        placeholder="Cuisine (Indian, Italian...)"
        className="w-full p-3 border rounded-lg"
        onChange={handleChange}
      />
      <div className="flex flex-col gap-3 md:flex">
      <select
  name="diet"
  value={recipe.diet}
  onChange={handleChange}
  className="border p-2 rounded"
  placeholder="diet"
>
  <option value="Veg">Veg</option>
  <option value="Non-Veg">Non-Veg</option>
  <option value="Vegan">Vegan</option>
</select>

<input
  type="number"
  name="cookTime"
  placeholder="Cook time (minutes)"
  value={recipe.cookTime}
  onChange={handleChange}
  className="border p-2 rounded"
/>
<select
  name="difficulty"
  value={recipe.difficulty}
  onChange={handleChange}
  className="border p-2 rounded"
  placeholder="difficulty"
>
  <option value="Easy">Easy</option>
  <option value="Medium">Medium</option>
  <option value="Hard">Hard</option>
</select>
</div>

      <textarea
        name="ingredients"
        placeholder="Ingredients (comma separated)"
        className="w-full p-3 border rounded-lg"
        onChange={handleChange}
      />

      <textarea
        name="instructions"
        placeholder="Cooking Instructions"
        rows="4"
        className="w-full p-3 border rounded-lg"
        onChange={handleChange}
      />

      <button
        className="w-full bg-orange-400 text-white py-3 rounded-xl hover:bg-orange-500 transition"
      >
        Add Recipie
      </button>
    </form>
  </div>
);
};

export default AddRecipe;
