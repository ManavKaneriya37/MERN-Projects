const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(import.meta.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const generateResult = async (prompt) => {

    const result = await model.generateContent(prompt);
    return result.response.text();
}