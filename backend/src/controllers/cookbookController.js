const Recipe = require("../models/Recipe");

// SAVE RECIPE
const saveRecipe = async (req, res) => {
  try {
    const recipeData = { ...req.body };

    // Check required title
    if (!recipeData.title || !recipeData.title.trim()) {
      return res.status(400).json({
        message: "Recipe title is required",
      });
    }

    // Normalize diet values
    if (recipeData.diet) {
      const dietMap = {
        vegetarian: "Vegetarian",
        "non-vegetarian": "Non-Vegetarian",
        "non vegetarian": "Non-Vegetarian",
        vegan: "Vegan",
        eggetarian: "Eggetarian",
        general: "General",
        none: "General",
      };

      recipeData.diet =
        dietMap[recipeData.diet.trim().toLowerCase()] || "General";
    }

    // Normalize difficulty values
    if (recipeData.difficulty) {
      const difficultyMap = {
        easy: "Easy",
        medium: "Medium",
        hard: "Hard",
      };

      recipeData.difficulty =
        difficultyMap[recipeData.difficulty.trim().toLowerCase()] || "Easy";
    }

    console.log("Saving recipe:", recipeData);

    const recipe = await Recipe.create(recipeData);

    res.status(201).json(recipe);

  } catch (error) {
    console.error("Save recipe error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER RECIPES
const getUserRecipes = async (req, res) => {
  try {
    const { clerkUserId } = req.params;

    const recipes = await Recipe.find({
      clerkUserId,
    }).sort({ createdAt: -1 });

    res.status(200).json(recipes);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE RECIPE
const deleteRecipe = async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Recipe deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  saveRecipe,
  getUserRecipes,
  deleteRecipe,
};