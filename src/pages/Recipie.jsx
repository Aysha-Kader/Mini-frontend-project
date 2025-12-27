import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../data/recipeSlice";
import RecipeCard from "../components/RecipieCard";
import {useNavigate} from "react-router-dom"

const Recipes = () => {
  const dispatch = useDispatch();
  const { recipes, loading } = useSelector(state => state.recipes);
  const [search, setSearch] = useState("");
  
const navigate=useNavigate("");
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const filteredRecipes = recipes?.filter(r =>
    r.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-yellow-100 px-4 md:px-8 py-8">
      
      {/* title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Discover <span className="text-yellow-400">Recipes</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Explore delicious recipes from our foodie community
        </p>
      </div>

      {/*search */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search your favourite recipe..."
          className="w-full md:w-1/2 p-3 rounded-xl bg-white shadow focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
       <button
  onClick={() => navigate("/add-recipe")}
  className="bg-green-500 text-white px-5 py-2 rounded-xl mb-6"
>
  ➕ Add New Recipe
</button>
      {/*  */}
      {loading ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes?.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
