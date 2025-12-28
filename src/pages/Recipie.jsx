import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../data/recipeSlice";
import RecipeCard from "../components/RecipieCard";
import { useNavigate } from "react-router-dom";

const Recipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, loading } = useSelector(state => state.recipes);

  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [time, setTime] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [diet, setDiet] = useState("All");

  useEffect(() => {
    if (recipes.length === 0) dispatch(fetchRecipes());
  }, [dispatch, recipes.length]);
  const getIngredientsText = (recipe) => {
  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient.toLowerCase());
    }
  }

  return ingredients.join(" ");
};


  const filteredRecipes = recipes
    ?.filter(r => {
  const searchText = search.toLowerCase();

  const mealMatch = r.strMeal?.toLowerCase().includes(searchText);
  const ingredientMatch = getIngredientsText(r).includes(searchText);

  return mealMatch || ingredientMatch;
})
  .filter(r => cuisine === "All" || r.strArea === cuisine || r.area === cuisine)
    .filter(r => {
      if (time === "All") return true;
      return r.cookTime ? r.cookTime <= Number(time) : true;
    })
    .filter(r => difficulty === "All" || r.difficulty === difficulty)
    .filter(r => diet === "All" || r.diet === diet);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-yellow-100 px-4 md:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          Discover <span className="text-yellow-400">Recipes</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Explore delicious recipes from our foodie community
        </p>
      </div>

      {/* Search */}
      <div className="flex flex-col justify-center mb-6 gap-4 flex-wrap">
        <div className="flex justify-center text-center">
          
       
        <input
          type="text"
          placeholder="Search your favourite recipe..."
          className="w-full md:w-1/2 p-3 rounded-xl bg-white shadow focus:outline-none justify-center"
          onChange={(e) => setSearch(e.target.value)}
        />
 </div>
        {/* Cuisine Filter */}
        <div className="grid grid-cols-2 md:grid-cols-4  justify-between text-center ">
        <select className="p-2 rounded-lg" value={cuisine} onChange={e => setCuisine(e.target.value)}>
          <option>All</option>
          <option>Indian</option>
          <option>Italian</option>
          <option>American</option>
            <option>Turkish</option>
              <option>Saudi Arabian</option>
                <option>Japanese</option>
                  <option>Ukrainian</option>
                    <option>Croatian</option>
                    <option>Spanish</option>
                      <option>American</option>

        </select>

        {/* Time Filter */}
        <select className="p-2 rounded-lg" value={time} onChange={e => setTime(e.target.value)}>
          <option value="All">All Time</option>
          <option value="15">Under 15 min</option>
          <option value="30">Under 30 min</option>
          <option value="60">Under 60 min</option>
        </select>

        {/* Difficulty Filter */}
        <select className="p-2 rounded-lg" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        {/* Diet Filter */}
        <select className="p-2 rounded-lg" value={diet} onChange={e => setDiet(e.target.value)}>
          <option>All</option>
          <option>Veg</option>
          <option>Non-Veg</option>
          <option>Vegan</option>
        </select>
        </div>
      </div>

      {/* Add Recipe Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate("/add-recipe")}
          className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-800 hover:scale-105 cursor-pointer"
        >
          Add New Recipe
        </button>
      </div>

      {/* Recipes Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading recipes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes?.map(recipe => (
            <RecipeCard key={recipe.idMeal || recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
