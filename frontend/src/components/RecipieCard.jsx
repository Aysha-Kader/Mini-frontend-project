
import { FaHeart, FaStar } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../axios/api.js";
import {useDispatch} from "react-redux";

const RecipeCard = ({ recipe }) => {
const dispatch=useDispatch();
  const navigate = useNavigate();
  const [isFav,setIsFav] = useState(false);

  const toggleFavorite = async () => {

    const token = localStorage.getItem("token");

    try{

     const res= await API.post(
        `/favoruites/${recipe._id}`,
        {},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setIsFav(!isFav);

    }catch(err){
      console.log(err);
    }

  };
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105 overflow-hidden">
      {/* recipie image */}
      <img
        src={recipe.photo}
        alt={recipe.name}
        className="w-full h-44 object-cover"
      />
      {/* recipiename */}
      <div className="p-4 space-y-2">
        <h3 className="font-bold text-lg text-gray-800">
          {recipe.name}
        </h3>
        {/* features */}
        <div className="flex items-center gap-1 text-yellow-400 text-sm">
          <FaStar /> 4.5
        </div>

        <p className="text-sm text-gray-500">
          Cuisine: {recipe.area}
        </p>

        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => navigate(`/recipes/${recipe._id}`)}
            className="bg-orange-400 text-white px-3 py-1 rounded-lg hover:bg-orange-500 transition cursor-pointer"
          >
            View Recipe
          </button>

          <FaHeart
            onClick={ toggleFavorite}
            className={`text-xl cursor-pointer transition ${isFav ? "text-red-500" : "text-gray-300 hover:text-red-400"
              }`}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
