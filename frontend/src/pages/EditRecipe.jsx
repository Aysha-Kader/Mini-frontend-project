import { useEffect, useState } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecipeById, updateRecipe } from "../data/recipeSlice";

const EditRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
const recipe=useSelector (state => state.recipes.selectedRecipe);
  const [form, setForm] = useState({
    name:" "  ,
    image: " ",
    ingredients: " ",
    instructions: " ",
  });

  useEffect(() => {
    const loadRecipe = async () => {
      const res = await dispatch(fetchRecipeById(id)).unwrap();

      setForm({
        name: recipe.name  ,
        image: recipe.photo ,
        ingredients: recipe.ingredients.join(", ") ,
        instructions: recipe.instructions ,
      });
    };

    loadRecipe();
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(updateRecipe({
      id,
      data: {
        ...form,
        ingredients: form.ingredients.split(","),
      }
    }));

    navigate(`/recipes/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 space-y-4  bg-gradient-to-r from-yellow-100 to-gray-100 ">
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name"
        className="border p-2 w-full"
      />

      <input
        value={form.photo}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="Image URL"
        className="border p-2 w-full"
      />

      <textarea
        value={form.ingredients}
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        placeholder="Ingredients (comma separated)"
        className="border p-2 w-full"
      />

      <textarea
        value={form.instructions}
        onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        placeholder="Instructions"
        className="border p-2 w-full"
      />

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        Update Recipe
      </button>
    </form>
  );
};

export default EditRecipe;