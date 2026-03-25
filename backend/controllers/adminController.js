import User from "../models/User.js";
import Recipe from "../models/Recipe.js";


//  STATS
export const getStats = async (req, res) => {
  const users = await User.countDocuments();
  const recipes = await Recipe.countDocuments();
 
  res.json({ users, recipes, comments });
};

//  USERS
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const approveUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.status = "approved";
  await user.save();
  res.json({ message: "User approved" });
};

export const rejectUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.status = "rejected";
  await user.save();
  res.json({ message: "User rejected" });
};

export const banUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isBanned = true;
  await user.save();
  res.json({ message: "User banned" });
};

// RECIPES
export const getRecipesAdmin = async (req, res) => {
  const recipes = await Recipe.find().populate("user");
  res.json(recipes);
};

export const deleteRecipeAdmin = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: "Recipe deleted" });
};

