// pages/api/ctsearch.js
const BASE_URL = process.env.TWITTER_SCANNER_API_URL;
const BEARER = process.env.TWITTER_SCANNER_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { projectName, twitterHandle, contractAddress } = req.body;

  const write = (msg) => res.write(`${msg}\n`);

  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-cache",
    "Transfer-Encoding": "chunked",
    Connection: "keep-alive",
  });

  try {
    const keywords = [];
    if (projectName) keywords.push(projectName.replaceAll(" ", ""));
    if (contractAddress) keywords.push(contractAddress);
    if (twitterHandle) keywords.push(twitterHandle.replace("@", ""));

    write(`🔍 Scanning for keywords: ${keywords.join(", ")}`);

    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 7);

    const end = new Date(today);
    end.setDate(today.getDate() + 1);

    const body = {
      keyword: keywords,
      start_date: start.toISOString().split("T")[0],
      end_date: end.toISOString().split("T")[0],
      max_tweets: 30,
      min_faves: 2,
    };

    const response = await fetch(`${BASE_URL}/search/max`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BEARER}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!data.success) {
      write(`❌ Scanner error: ${data.message || "Unknown error"}`);
      return res.end();
    }

    write(`✅ Job started: ${data.job_id}`);

    write(`📦 Job submitted. You can now begin AI analysis.`);

    res.end();
  } catch (err) {
    console.error("❌ ctsearch error:", err);
    write(`❌ Error: ${err.message}`);
    res.end();
  }
}
