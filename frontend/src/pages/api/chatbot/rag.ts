import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call the FastAPI RAG service
    const ragResponse = await fetch("http://localhost:8001/api/rag/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!ragResponse.ok) {
      throw new Error(
        `RAG service responded with status: ${ragResponse.status}`
      );
    }

    const data = await ragResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("RAG chatbot error:", error);
    res.status(500).json({
      error: "Failed to process RAG query",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
