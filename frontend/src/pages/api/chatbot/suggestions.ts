import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { category, max_price } = req.query;

    // Build query parameters
    const params = new URLSearchParams();
    if (category) params.append("category", category as string);
    if (max_price) params.append("max_price", max_price as string);

    // Proxy the request to the backend FastAPI server
    const backendResponse = await fetch(
      `http://localhost:8000/api/chatbot/suggestions?${params}`,
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
    console.error("Chatbot suggestions error:", error);
    res.status(500).json({
      error: "Failed to get suggestions",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
