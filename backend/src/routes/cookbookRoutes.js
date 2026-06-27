const express = require("express");

const {
  saveRecipe,
  getUserRecipes,
  deleteRecipe,
} = require("../controllers/cookbookController");

const router = express.Router();

// SAVE RECIPE
router.post("/save", saveRecipe);

// GET USER RECIPES
router.get("/:clerkUserId", getUserRecipes);

// DELETE RECIPE
router.delete("/:id", deleteRecipe);

module.exports = router;