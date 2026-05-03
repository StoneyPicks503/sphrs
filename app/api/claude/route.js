export async function POST(req) {
  try {
    const { text } = await req.json();

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 8000,
        messages: [{ role: "user", content: [{ type: "text", text }] }],
      }),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: { message: err.message } }, { status: 500 });
  }
}
