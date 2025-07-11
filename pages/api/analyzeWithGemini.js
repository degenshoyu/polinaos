// pages/api/analyzeWithGemini.js
export default async function handler(req, res) {
  const { tweets } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!tweets || !Array.isArray(tweets)) {
    return res.status(400).json({ error: "No tweets provided." });
  }

  const tweetLines = tweets
    .slice(0, 10)
    .map((t, idx) => `(${idx + 1}) ${t.textContent}`)
    .join("\n");

  const prompt = `
You are an AI assistant helping a project researcher understand how a crypto token is discussed on Twitter.

Please:
- Summarize what this project is about.
- Assess how active and enthusiastic the community is.
- Evaluate clarity of content.
- Comment on virality patterns (memes, giveaways, shoutouts, etc.)
- Provide numeric scores (1–10) for:
  - Community Involvement
  - Content Clarity
  - Virality Potential
- Finally, list key themes found in these tweets.

Tweets to analyze:
${tweetLines}
`;

  try {
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
        apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    );

    const json = await geminiRes.json();

    if (!json.candidates || !json.candidates[0]?.content?.parts?.[0]?.text) {
      console.error("Gemini error:", JSON.stringify(json, null, 2));
      return res
        .status(500)
        .json({ text: "❌ Gemini AI returned no valid response." });
    }

    const text = json.candidates[0].content.parts[0].text;
    res.status(200).json({ text });
  } catch (err) {
    console.error("Gemini fetch failed:", err);
    res
      .status(500)
      .json({ text: "❌ Gemini request failed. Try again later." });
  }
}
