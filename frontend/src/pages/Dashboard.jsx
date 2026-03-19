import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipieCard";
import { fetchRecipes, fetchFavorites } from "../data/recipeSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { recipes, favorites, loading } = useSelector(state => state.recipes);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/");
    dispatch(fetchRecipes());
    dispatch(fetchFavorites());
  }, [user, navigate, dispatch]);

  // Recipes added by the logged-in user
  const myRecipes = recipes.filter(recipe => recipe.user === user?.id);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-yellow-500 mb-10 text-center">
        Welcome, {user?.name}!
      </h1>

      {/* My Recipes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          My Recipes 🍳
        </h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : myRecipes.length === 0 ? (
          <p className="text-gray-500">You haven’t added any recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myRecipes.map(recipe => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden relative"
              >
                <img
                  src={recipe.photo}
                  alt={recipe.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-lg text-gray-800">{recipe.name}</h3>
                  <p className="text-gray-500 text-sm">Cuisine: {recipe.area}</p>

                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => navigate(`/recipes/${recipe._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      View
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => navigate(`/recipes/edit/${recipe._id}`)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Favorites */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          My Favorites ❤️
        </h2>
        {favorites.length === 0 ? (
          <p className="text-gray-500">You haven’t liked any recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favorites.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;