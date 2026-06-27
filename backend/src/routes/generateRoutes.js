const express = require("express");

const {
  generateRecipe,
} = require("../controllers/generateController");

const router = express.Router();
console.log(generateRecipe);
router.post("/", generateRecipe);

module.exports = router;