import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const submission = req.body;
      submission.timestamp = new Date().toISOString();

      let submissions = (await kv.get("submissions")) || [];
      if (!Array.isArray(submissions)) submissions = [];
      submissions.push(submission);

      await kv.set("submissions", submissions);

      return res.status(200).json({ message: "Submission saved" });
    } else if (req.method === "GET") {
      const submissions = (await kv.get("submissions")) || [];
      return res.status(200).json({ submissions });
    } else if (req.method === "DELETE") {
      // Expecting a JSON body with a 'timestamp' field that uniquely identifies a submission
      const { timestamp } = req.body;
      let submissions = (await kv.get("submissions")) || [];
      submissions = Array.isArray(submissions)
        ? submissions.filter((sub) => sub.timestamp !== timestamp)
        : [];
      await kv.set("submissions", submissions);
      return res.status(200).json({ message: "Submission deleted" });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
