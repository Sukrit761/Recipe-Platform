const buildRecipePrompt = (
  ingredients,
  cuisine,
  diet,
  maxTime
) => {
  return `
You are an expert chef, nutritionist, and recipe developer.

Your task is to generate ONE delicious, realistic, and easy-to-follow recipe using the ingredients provided.

### User Preferences
Ingredients:
${ingredients.join(", ")}

Cuisine:
${cuisine || "Any"}

Diet:
${diet || "General"}

Maximum Cooking Time:
${maxTime || 30} minutes

----------------------------

### Requirements

1. Use the provided ingredients as the primary ingredients.
2. You may add common pantry items like:
   - Salt
   - Pepper
   - Oil
   - Butter
   - Garlic
   - Ginger
   - Basic spices
3. Do NOT invent rare ingredients.
4. Keep the recipe within the requested cooking time.
5. Make the recipe practical for home cooking.
6. Write clear step-by-step instructions.
7. Return ONLY valid JSON.
8. Do NOT include markdown.
9. Do NOT wrap the JSON in \`\`\`.
10. Do NOT include explanations before or after the JSON.

----------------------------

Allowed values

Diet MUST be exactly one of:

- Vegetarian
- Non-Vegetarian
- Vegan
- Eggetarian
- General

Difficulty MUST be exactly one of:

- Easy
- Medium
- Hard

----------------------------

JSON Schema

{
  "title": "Recipe Name",

  "description": "A short 2-3 sentence description of the dish.",

  "ingredients": [
    "ingredient 1",
    "ingredient 2"
  ],

  "steps": [
    "Step 1",
    "Step 2"
  ],

  "cuisine": "Indian",

  "diet": "Vegetarian",

  "cookingTime": "25 minutes",

  "maxTime": 25,

  "difficulty": "Easy",

  "tips": [
    "Chef tip 1",
    "Chef tip 2"
  ]
}

Return ONLY the JSON object.
`;
};

module.exports = buildRecipePrompt;