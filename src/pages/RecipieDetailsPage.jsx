import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchRecipeById } from "../data/recipeSlice";


import { deleteRecipie } from "../data/recipeSlice";

import {useNavigate} from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector(state => state.recipes.selectedRecipe);
  const [timer, setTimer] = useState(0);
  const navigate=useNavigate();

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (!recipe) return <p className="text-center">Loading...</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`];
    if (ing) ingredients.push(ing);
  }

  return ( 
    <div className=" min-h-screen bg-gradient-to-r from-gray-100 to-yellow-100 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-extrabold mb-4">
          { recipe.strMeal}
        </h1>

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-[500px] h-[500px] rounded-xl mb-6"
        />

        {/*ingridients*/}
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="space-y-1 mb-6 text-gray-600">
          {ingredients.map((ing, i) => (
            <li key={i}>
              <input type="checkbox" className="mr-2 accent-orange-400" />
              {ing}
            </li>
          ))}
        </ul>

        {/*instruction*/}
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <p className="text-gray-600 whitespace-pre-line mb-6">
          {recipe.strInstructions}
        </p>

       
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setTimer(timer + 5)}
            className="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition  hover:scale-105 cursor-pointer"
          >
            ⏱ Add 5 mins
          </button>

          <button
            onClick={() => window.print()}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition  hover:scale-105 cursor-pointer"
          >
            🖨 Print Recipe
          </button>
          <button
            onClick={() => navigate("/recipies")}
            className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-900 transition  hover:scale-105 cursor-pointer"
          >
            Back to  Recipe
          </button>

          {recipe.isLocal && (
            <button onClick={()=>{
              const confirmDelete =window.confirm(
                "Are you sure you want to delete this recipe?"
              );

              if (confirmDelete){
                dispatch(deleteRecipie (recipe.idMeal));
                navigate("/recipies");
              }

              }
            }
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition  hover:scale-105 cursor-pointer">Delete Recipie</button>
         
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
