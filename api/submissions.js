import { Redis } from "@upstash/redis";

// Use the Upstash Vector environment variables
const redis = new Redis({
  url: process.env.UPSTASH_VECTOR_REST_URL,  // e.g., "https://creative-glowworm-13128-us1-vector.upstash.io"
  token: process.env.UPSTASH_VECTOR_REST_TOKEN,  // your provided token
});

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const submission = req.body;
      submission.timestamp = new Date().toISOString();

      // Retrieve submissions stored as a JSON string, then parse it
      const submissionsStr = await redis.get("submissions");
      let submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
      if (!Array.isArray(submissions)) {
        submissions = [];
      }
      submissions.push(submission);

      // Save the updated submissions array as a JSON string
      await redis.set("submissions", JSON.stringify(submissions));
      return res.status(200).json({ message: "Submission saved" });
    } else if (req.method === "GET") {
      // Retrieve stored submissions and parse them
      const submissionsStr = await redis.get("submissions");
      const submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
      return res.status(200).json({ submissions });
    } else if (req.method === "DELETE") {
      // For deletion, expect a JSON body with a unique 'timestamp'
      const { timestamp } = req.body;
      const submissionsStr = await redis.get("submissions");
      let submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
      submissions = Array.isArray(submissions)
        ? submissions.filter((sub) => sub.timestamp !== timestamp)
        : [];
      await redis.set("submissions", JSON.stringify(submissions));
      return res.status(200).json({ message: "Submission deleted" });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}
