import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const submission = req.body;
      submission.timestamp = new Date().toISOString();

      // Retrieve stored submissions as a JSON string, then parse it
      const submissionsStr = await redis.get("submissions");
      let submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
      if (!Array.isArray(submissions)) {
        submissions = [];
      }
      submissions.push(submission);

      // Store the updated submissions as a JSON string
      await redis.set("submissions", JSON.stringify(submissions));

      return res.status(200).json({ message: "Submission saved" });
    }

    if (req.method === "GET") {
      // Retrieve stored submissions
      const submissionsStr = await redis.get("submissions");
      const submissions = submissionsStr ? JSON.parse(submissionsStr) : [];
      return res.status(200).json({ submissions });
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("API Error:", error);
    // Return error details for debugging (remove error details in production)
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
