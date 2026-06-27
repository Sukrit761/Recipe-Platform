const express = require("express");

const {
  getAllRecipes,
  getRecipeById,
} = require("../controllers/exploreController");

const router = express.Router();

// GET all recipes
router.get("/", getAllRecipes);

// GET recipe by id
router.get("/:id", getRecipeById);

module.exports = router;