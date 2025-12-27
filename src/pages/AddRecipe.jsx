import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecipe } from "../data/recipeSlice";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    area: "",
    ingredients: "",
    instructions: "",
  });

  const handleChange = e => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const ingredientsArr = recipe.ingredients.split(",");

    const newRecipe = {
      idMeal: Date.now().toString(),
      isLocal:true,
      strMeal: recipe.name,
      strMealThumb: recipe.image,
      strArea: recipe.area,
      strInstructions: recipe.instructions,
    };

    ingredientsArr.forEach((ing, i) => {
      newRecipe[`strIngredient${i + 1}`] = ing.trim();
    });

    dispatch(addRecipe(newRecipe));
    navigate(`/recipes/${newRecipe.idMeal}`);
  };

  return (
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
