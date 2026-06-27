const groq = require("../config/aiConfig");

const generateRecipeFromAI = async (prompt) => {
  try {

    const chatCompletion =
      await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama-3.3-70b-versatile",
      });

    let response =
      chatCompletion.choices[0]?.message?.content;

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return response;

  } catch (error) {

    console.log(error);

    throw new Error("AI generation failed");
  }
};

module.exports = generateRecipeFromAI;