const groq = require("../config/aiConfig");

const generateRecipeFromAI = async (prompt) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
    });

    let response = chatCompletion.choices[0]?.message?.content;

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return response;
  } catch (error) {
    console.error("Groq AI Error:", error);
    throw new Error("AI generation failed");
  }
};

module.exports = generateRecipeFromAI;