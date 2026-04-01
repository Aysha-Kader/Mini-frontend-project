import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//recipie model
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
  cookTime:String,
   feedbacks: [feedbackSchema],
},


 { timestamps: true });

const Recipe= mongoose.model("Recipe", recipeSchema);
export default Recipe;




