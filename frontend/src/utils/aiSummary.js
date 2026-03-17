// utils/aiSummary.js
import API from "../axios/api.js"; 

export async function getRecipeSummary(text) {
  try {
    const res = await API.post("/ai/summary", { text });
    return res.data.summary;
  } catch (error) {
    console.error("AI summary frontend error:", error);
    return "Error generating summary.";
  }
}