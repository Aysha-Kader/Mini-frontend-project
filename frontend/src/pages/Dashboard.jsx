import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, deleteRecipe, fetchFavorites } from "../data/recipeSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, loading, favorites } = useSelector(state => state.recipes);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch recipes + favorites
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchRecipes());
      dispatch(fetchFavorites());
    }
  }, [dispatch]);

  // Filter user recipes
  const userRecipes = (user && recipes)
    ? recipes.filter(r => {
        const recipeUserId =
          typeof r.user === "object" && r.user !== null
            ? r.user._id
            : r.user;

        return recipeUserId === (user._id || user.id);
      })
    : [];

  // Filter favorite recipes
  const favRecipes = recipes.filter(recipe =>
    favorites.includes(recipe._id)
  );

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-gray-100 p-8">

      {/* 👋 Welcome */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          👋 Welcome, {user?.name || "Chef"}!
        </h1>

        <p className="text-gray-600">
          You have <b>{userRecipes.length}</b> recipe
          {userRecipes.length !== 1 && "s"} and{" "}
          <b>{favRecipes.length}</b> favorite
          {favRecipes.length !== 1 && "s"}.
        </p>
      </div>

      {/* ➕ Add Recipe */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => navigate("/add-recipe")}
          className="bg-yellow-400 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-500"
        >
          ➕ Add New Recipe
        </button>
      </div>

      {/* ❤️ FAVORITES SECTION */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          ❤️ Your Favorite Recipes ({favRecipes.length})
        </h2>

        {favRecipes.length === 0 ? (
          <p className="text-center text-gray-500">
            No favorites yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favRecipes.map(recipe => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={recipe.photo || recipe.image}
                  alt={recipe.name}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    {recipe.name}
                  </h3>

                  <p className="text-gray-500">
                    Cuisine: {recipe.area}
                  </p>

                  <button
                    onClick={() => navigate(`/recipes/${recipe._id}`)}
                    className="mt-2 bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-500"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🍳 USER RECIPES */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          🍳 Your Recipes ({userRecipes.length})
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : userRecipes.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't added any recipes yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userRecipes.map(recipe => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={recipe.photo || recipe.image}
                  alt={recipe.name}
                  className="w-full h-40 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {recipe.name}
                  </h3>

                  <p className="text-gray-500">
                    Cuisine: {recipe.area}
                  </p>

                  <p className="text-gray-500 mb-3">
                    Cook Time: {recipe.cookTime} mins
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/recipes/${recipe._id}`)}
                      className="bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-500"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;