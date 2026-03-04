import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  image: String,
  area: String,
  ingredients: [String],
  instructions: String,
  diet: String,
  difficulty: String,
  cookTime: Number,
}, { timestamps: true });

const Recipie= mongoose.model("Recipe", recipeSchema);
export default Recipie;