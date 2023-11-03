import { NextResponse } from "next/server";

import { OpenAIStream } from "@/services/openai";

export async function POST(request: Request) {
  // Get formData from request
  const body = await request.json();
  const { max_tokens, messages } = body;

  try {
    const stream = await OpenAIStream({
      model: "gpt-3.5-turbo",
      messages,
      max_tokens,
      temperature: 0.9,
      stream: true,
      api_key: process.env.OPENAI_API_KEY!,
    });
    return new Response(stream);
  } catch (error: any) {
    console.log(error.response.data.error.message);
    return NextResponse.json({
      message: error?.response?.data?.error?.message ?? "An error occured.",
    });
  }
}
