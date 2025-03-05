import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const submission = req.body;
      submission.timestamp = new Date().toISOString();

      // Retrieve stored submissions. kv.get() should return the value as stored.
      let submissions = await kv.get("submissions") || [];
      // Ensure submissions is an array:
      if (!Array.isArray(submissions)) {
        submissions = [];
      }
      submissions.push(submission);

      // Store the updated array
      await kv.set("submissions", submissions);

      return res.status(200).json({ message: "Submission saved" });
    } else if (req.method === "GET") {
      const submissions = await kv.get("submissions") || [];
      return res.status(200).json({ submissions });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
