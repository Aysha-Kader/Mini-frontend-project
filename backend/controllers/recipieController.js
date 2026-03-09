import Recipe from "../models/Recipe.js";


// CREATE RECIPE
export const createRecipe = async (req, res) => {

  try {

    const recipe = new Recipe(req.body);

    await recipe.save();

    res.status(201).json(recipe);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET ALL RECIPES
export const getRecipes = async (req, res) => {

  try {

    const recipes = await Recipe.find();

    res.json(recipes);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};


// GET SINGLE RECIPE
export const getRecipeById = async (req, res) => {

  try {

    const recipe = await Recipe.findById(req.params.id);

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