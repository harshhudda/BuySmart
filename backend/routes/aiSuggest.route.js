import express from "express";
import axios from "axios";
import Product from "../models/product.model.js"; // Adjust path if needed

const router = express.Router();

router.post("/suggest", async (req, res) => {
  const { query } = req.body;
  const products = await Product.find().limit(20);

  const prompt = `
    Here are some products: ${products.map(p => `${p.name}: ${p.description}`).join('; ')}.
    A user is looking for: "${query}".
    Which products would you recommend? Return a list of product names.
  `;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct", // or another available model
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const aiReply = response.data.choices[0].message.content;

    // Extract product names from aiReply (assuming one per line)
    const suggestedNames = aiReply
      .split('\n')
      .map(line => line.trim().replace(/^[\d\-\.\)]*\s*/, '')) // remove leading numbers/bullets
      .filter(Boolean);

    // Find matching products by checking if product name appears in the AI reply (case-insensitive)
    const matchedProducts = products.filter(p =>
      aiReply.toLowerCase().includes(p.name.toLowerCase())
    );

    res.json({ suggestions: aiReply, products: matchedProducts });
  } catch (err) {
    console.error("AI Suggestion Error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "AI suggestion failed" });
  }
});

export default router;