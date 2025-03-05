import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    const submission = req.body;
    submission.timestamp = new Date().toISOString();

    // Fetch existing submissions from Redis
    let submissions = (await redis.get("submissions")) || [];
    submissions.push(submission);

    // Store updated submissions
    await redis.set("submissions", submissions);

    return res.status(200).json({ message: "Submission saved" });
  }

  if (req.method === "GET") {
    // Retrieve all submissions from Redis
    const submissions = (await redis.get("submissions")) || [];
    return res.status(200).json({ submissions });
  }

  res.status(405).json({ message: "Method not allowed" });
}
