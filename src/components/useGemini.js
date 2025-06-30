import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAZtOMrCiNhtIPJRtAYJJrJihl7knfkkFY");

export async function getSummary(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Summarize the following text into 3-5 concise bullet points.
    Return it as a JSON array like:
    [ "Point 1", "Point 2", "Point 3" ]

    TEXT: ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
//   const output = response.text();

let output = response.text().trim();

if (output.startsWith("```")) {
  output = output.replace(/```json|```/g, "").trim();
}


  try {
    return JSON.parse(output);
  } catch {
    return ["Could not parse AI response", output];
  }
}

export default getSummary;
