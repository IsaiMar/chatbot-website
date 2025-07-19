const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  console.log("OpenAI key loaded?", process.env.OPENAI_API_KEY !== undefined);

  try {
    const context = req.body.context || "default";
    const systemPrompts = {
    default: `
      You are a helpful AI assistant for Super General Pest Control Services.
      You provide short, friendly, and professional answers to users asking about pest control treatments, booking, pricing, and service availability.
      We treat: spiders, ants, cockroaches, termites, and wasps.
      We operate in: Salt Lake City, West Valley, and Provo.
      Business hours: Monday to Saturday, 8am to 6pm.
      If a user asks for pricing, direct them to the http://localhost:3000/book page.
      If unsure, suggest they contact customer support through the website or call 801-555-5555.
      Help them book service or answer pest-related questions clearly.
    `,
    booking: `
      You are a booking assistant for Super General Pest Control.
      Help the user find a treatment and book a service. Suggest dates within Monday–Saturday, 8am–6pm.
      Redirect pricing questions to http://localhost:3000/book.
    `,
    sales: `
      You are a friendly sales agent for Super General Pest Control Services.
      Highlight the benefits of our service and encourage users to get a free quote or book online.
      Mention treatments for spiders, ants, and termites, and recommend add-ons.
    `,
  };
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompts[context] || systemPrompts.default },
        { role: "user", content: message },
      ],
      temperature: 0.4,
      max_tokens: 200,
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ error: "Failed to get a response from ChatGPT" });
  }
});

module.exports = router;
