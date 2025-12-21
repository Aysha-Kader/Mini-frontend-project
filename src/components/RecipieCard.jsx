import { FaHeart, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../data/recipeSlice";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector(state => state.recipes.favorites);

  const isFav = favorites.includes(recipe.idMeal);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden">
      
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-44 object-cover"
      />

      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-gray-800">
          {recipe.strMeal}
        </h3>

        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          <FaStar /> 4.5
        </div>

        <p className="text-sm text-gray-500">
          Cuisine: {recipe.strArea}
        </p>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => navigate(`/recipes/${recipe.idMeal}`)}
            className="bg-orange-400 text-white px-3 py-1 rounded-lg hover:bg-orange-500 transition"
          >
            View Recipe
          </button>

          <FaHeart
            onClick={() => dispatch(toggleFavorite(recipe.idMeal))}
            className={`text-xl cursor-pointer transition ${
              isFav ? "text-red-500" : "text-gray-300 hover:text-red-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
