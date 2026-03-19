import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../data/recipeSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, loading } = useSelector(state => state.recipes);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  
  

  // Fetch all recipes if not already fetched
  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(fetchRecipes());
    }
  }, [dispatch, recipes.length]);

  
  // Filter recipes created by logged-in user
  const userRecipes = (user && recipes)? recipes.filter(r => {

    const recipeUserId=(typeof r.user ===  "object"  &&  r.user !== null) ? r.user._id
    :r.user;
    return recipeUserId ===( user._id  || user.id);
  }):[];
console.log("user",user);
console.log("recipes",recipes);
  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-gray-100 p-8">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          👋 Welcome, {user?.name || "Chef"}!
        </h1>
        <p className="text-gray-600 text-lg">
          Here’s a quick overview of your recipes and actions you can take.
        </p>
        <p className="text-gray-500 mt-1">
          You have <span className="font-bold">{userRecipes.length}</span> recipe
          {userRecipes.length === 1 ? "" : "s"} added so far.
        </p>
      </div>

      {/* Add Recipe Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate("/add-recipe")}
          className="bg-yellow-400 text-white px-6 py-3 rounded-xl shadow hover:bg-yellow-500 transition"
        >
          ➕ Add New Recipe
        </button>
      </div>

      {/* Recipe Cards */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : userRecipes.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven't added any recipes yet. Start by clicking the "Add New Recipe" button above!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userRecipes.map(recipe => (
            <div
              key={recipe._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={recipe.photo}
                alt={recipe.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{recipe.name}</h2>
                <p className="text-gray-500 mb-2">Cuisine: {recipe.area}</p>
                <p className="text-gray-500 mb-4">Cook Time: {recipe.cookTime} mins</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/recipes/${recipe._id}`)}
                    className="bg-orange-400 text-white px-3 py-1 rounded hover:bg-orange-500 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/edit-recipe/${recipe._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
  );
};

export default Dashboard;