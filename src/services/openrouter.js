// /api/openrouter/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            request.headers.get("referer") || "https://yourdomain.com",
          "X-Title": "MovieDB",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) throw new Error("OpenRouter API error");
    return NextResponse.json(await response.json());
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
