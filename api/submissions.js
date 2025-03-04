import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const submission = req.body;
      submission.timestamp = new Date().toISOString();

      // Fetch existing submissions
      let submissions = (await kv.get("submissions")) || [];
      console.log("Existing submissions:", submissions);

      // Push new submission
      submissions.push(submission);

      // Store in KV
      await kv.set("submissions", submissions);
      console.log("Updated submissions:", submissions);

      return res.status(200).json({ message: "Submission saved" });
    } catch (error) {
      console.error("Error saving submission:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const submissions = (await kv.get("submissions")) || [];
      console.log("Retrieved submissions:", submissions);
      return res.status(200).json({ submissions });
    } catch (error) {
      console.error("Error retrieving submissions:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  res.status(405).json({ message: "Method not allowed" });
}
