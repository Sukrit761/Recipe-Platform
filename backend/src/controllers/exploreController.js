const recipes = require("../data/dummyRecipes");

// Get all recipes
const getAllRecipes = (req, res) => {
  res.status(200).json(recipes);
};

// Get single recipe
const getRecipeById = (req, res) => {
  const recipe = recipes.find(
    (r) => r.id === parseInt(req.params.id)
  );

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found",
    });
  }

  res.status(200).json(recipe);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
};