// /api/submissions.js
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const submission = req.body;
    submission.timestamp = new Date().toISOString();

    // Fetch existing submissions from KV
    let submissions = (await kv.get("submissions")) || [];
    submissions.push(submission);

    // Store updated submissions
    await kv.set("submissions", submissions);

    return res.status(200).json({ message: "Submission saved" });
  }

  if (req.method === "GET") {
    // Retrieve all submissions from KV
    const submissions = (await kv.get("submissions")) || [];
    return res.status(200).json({ submissions });
  }

  res.status(405).json({ message: "Method not allowed" });
}
