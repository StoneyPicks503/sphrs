export async function POST(req) {
  try {
    const body = await req.json();

    // Support { text } for simple calls and { messages } for image uploads
    const messages = body.messages
      ? body.messages
      : [{ role: "user", content: [{ type: "text", text: body.text }] }];

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: body.maxTokens || 8000,
        messages,
      }),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
