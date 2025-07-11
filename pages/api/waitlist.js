import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  const { name, project, email, reason } = req.body;

  if (!name || !project || !email || !reason)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("waitlist");

    await collection.insertOne({
      name,
      project,
      email,
      reason,
      createdAt: new Date(),
    });

    res.status(200).json({ success: true });
  } catch (e) {
    console.error("Waitlist insert error:", e);
    res.status(500).json({ error: "Server error" });
  }
}
