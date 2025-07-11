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

  const prompt = String.raw`
You are an AI assistant helping a crypto project researcher understand how a specific token is being discussed on Twitter.

Important Instructions:
- The analysis must focus **only on the project that is mentioned repeatedly or directly**, based on the keywords submitted (e.g. "Moodeng" or a specific token address).
- Do not include or speculate about other unrelated tokens, even if mentioned.
- If multiple tokens are mentioned in a tweet, only include them **if they are directly connected to the main project**.
- Ignore misleading or irrelevant mentions like meme coins that aren't core to the project.

💡 Formatting Instructions:
Please use **Markdown headings** to structure your output clearly. Each section must be preceded by a third-level heading (\`\`\`### Section Title\`\`\`). Do not include any general summary at the top.

### Example Format:

### Project Overview
...

### Community Activity
...

### Content Quality
...

### Virality Potential
...

### Scores
- Community Involvement: 8
- Content Clarity: 7
- Virality Potential: 9

### Key Themes
- Meme culture
- Pump.fun mentions
- Anniversary campaigns

📊 Now please analyze the following tweets and respond in the above format:

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
