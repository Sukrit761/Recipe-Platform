const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    ingredients: {
      type: [String],
      default: [],
    },

    steps: {
      type: [String],
      default: [],
    },

    cuisine: {
      type: String,
      default: "General",
    },

    diet: {
      type: String,
      enum: [
        "Vegetarian",
        "Non-Vegetarian",
        "Vegan",
        "Eggetarian",
        "General",
      ],
      default: "General",
    },

    cookingTime: {
      type: String,
      default: "Not specified",
    },

    maxTime: {
      type: Number,
      default: 30,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    tips: {
      type: [String],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Recipe",
  recipeSchema
);