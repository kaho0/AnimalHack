import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Proxy the request to the backend FastAPI server
    const backendResponse = await fetch(
      "http://localhost:8000/api/chatbot/query",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      }
    );

    if (!backendResponse.ok) {
      throw new Error(
        `Backend responded with status: ${backendResponse.status}`
      );
    }

    const data = await backendResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Chatbot query error:", error);
    res.status(500).json({
      error: "Failed to process query",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
