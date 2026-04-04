import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/prompt";

export async function POST(req: NextRequest) {
  try {
    const { language, mode, filters } = await req.json()

    if (!language || !mode) {
      return NextResponse.json(
        { error: "Missing language or mode" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt({ language, mode, filters })
    

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    const rawText =data?.candidates?.[0]?.content?.parts?.[0]?.text || ""

    const cleaned = rawText.replace(/```json|```/g, "").trim()

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (err) {
      console.error("JSON PARSE ERROR:", cleaned);

      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: cleaned },
        { status: 500 }
      );
    }

    return NextResponse.json({ words: parsed })

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}