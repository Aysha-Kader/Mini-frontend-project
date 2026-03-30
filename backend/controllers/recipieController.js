import Recipe from "../models/Recipe.js";
import User from "../models/User.js";


// CREATE RECIPE
export const createRecipe = async (req, res) => {

  try {

    const recipe = new Recipe({
      ...req.body,
      cookTime:Number(req.body.cookTime),
    user:req.user});

    await recipe.save();

    res.status(201).json(recipe);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET ALL RECIPES
export const getRecipes = async (req, res) => {

  try {

    const recipes = await Recipe
    .find()
    .populate("user","name");

    res.json(recipes);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET SINGLE RECIPE
export const getRecipeById = async (req, res) => {

  try {

    const recipe = await Recipe
    .findById(req.params.id)
    .populate("user","name");
    res.json(recipe);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// DELETE RECIPE
export const deleteRecipe = async (req, res) => {

  try {

    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ message: "Recipe deleted" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

//update recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    //  only owner can edit
    if (recipe.user.toString() !== req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//add feedback
export const addFeedback = async (req, res) => {
  try {
   

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    //  Get full user using req.user (id)
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Check approval
    if (!user.isApproved) {
      return res.status(403).json({
        message: "You are not approved to add feedback",
      });
    }

    //  prevent own recipe feedback 
    if (recipe.user && recipe.user.toString() === req.user) {
      return res.status(400).json({
        message: "You cannot give feedback to your own recipe",
      });
    }

    //  Validate comment
    if (!req.body.comment) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    const newFeedback = {
      user: req.user, // still using ID
      comment: req.body.comment,
    };

    recipe.feedbacks.push(newFeedback);

    await recipe.save();

    res.json(newFeedback);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
//de;lete feedback
export const deleteFeedback = async (req, res) => {
  const { recipeId, feedbackId } = req.params;

  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const feedback = recipe.feedbacks.id(feedbackId);

  if (!feedback) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  if (
    feedback.user.toString() !== req.user
    
  ) {
    return res.status(403).json({
      message: "Not allowed",
    });
  }

  recipe.feedbacks.pull(feedbackId);
  await recipe.save();

  res.json({ message: "Feedback deleted" });
};