import Recipe from "../models/Recipe.js";


// CREATE RECIPE
export const createRecipe = async (req, res) => {

  try {

    const recipe = new Recipe({
      ...req.body,
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