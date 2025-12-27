import { useSelector } from "react-redux";
import RecipeCard from "../components/RecipieCard";

const Favourites = () => {
  const { recipes, favorites } = useSelector(state => state.recipes);

  // filter favourite recipes
  const favRecipes = recipes.filter(recipe =>
    favorites.includes(recipe.idMeal)
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-yellow-100 px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        ❤️ Your Favourite Recipes
      </h1>

      {favRecipes.length === 0 ? (
        <p className="text-center text-gray-500">
          No favourite recipes yet
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favRecipes.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
