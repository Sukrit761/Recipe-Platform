const generateRecipeFromAI = require("../services/aiService");
const buildRecipePrompt = require("../utils/promptBuilder");

const generateRecipe = async (req, res) => {
  try {
    const {
      ingredients,
      cuisine,
      diet,
      maxTime,
    } = req.body;

    if (!ingredients || ingredients.length === 0) {
      return res.status(400).json({
        message: "Ingredients are required",
      });
    }

    const prompt = buildRecipePrompt(
      ingredients,
      cuisine,
      diet,
      maxTime
    );

    const aiResponse =
      await generateRecipeFromAI(prompt);

    const parsedRecipe =
      JSON.parse(aiResponse);

    res.status(200).json(parsedRecipe);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generateRecipe,
};