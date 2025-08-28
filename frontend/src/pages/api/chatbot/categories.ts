import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Proxy the request to the backend FastAPI server
    const backendResponse = await fetch(
      "http://localhost:8000/api/chatbot/categories",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
    console.error("Chatbot categories error:", error);
    res.status(500).json({
      error: "Failed to get categories",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
