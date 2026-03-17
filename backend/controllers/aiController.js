import axios from "axios";

export const getRecipeSummary = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "No text provided" });
  }

  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if (data?.error) {
      return res.status(500).json({ message: "Failed to generate summary" });
    }

    return res.json({ summary: data[0]?.summary_text || "No summary generated" });

  } catch (error) {
    console.error("AI backend error:", error.message);
    return res.status(500).json({ message: "AI service error" });
  }
};