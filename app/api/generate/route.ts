import { NextRequest, NextResponse } from "next/server";
import { saveSession, getSession, type FormData, type GeneratedContent } from "@/lib/sessions";
import { generateMockContent } from "@/lib/mockContent";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { formData, sessionId } = await req.json() as { formData: FormData; sessionId: string };

    if (!formData || !sessionId) {
      return NextResponse.json({ error: "Missing formData or sessionId" }, { status: 400 });
    }

    let generatedContent: GeneratedContent;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (apiKey && !apiKey.includes("REPLACE")) {
      // Real Claude generation
      const Anthropic = (await import("@anthropic-ai/sdk")).default;
      const client = new Anthropic({ apiKey });

      const prompt = `You are a professional copywriter. Generate website content for this business:
- Name: ${formData.businessName}
- Type: ${formData.businessType}
- What they do: ${formData.tagline}
- Main service: ${formData.mainService}
- Key benefits: ${formData.benefits?.join(", ")}
- Target audience: ${formData.targetAudience}
- Tone: ${formData.tone}
- Location: ${formData.city}

Generate JSON with exactly these fields:
{
  "heroHeadline": "...",
  "heroSubline": "...",
  "aboutTitle": "...",
  "aboutText": "...",
  "services": [{"title":"...","description":"..."},{"title":"...","description":"..."},{"title":"...","description":"..."}],
  "testimonials": [{"name":"...","role":"...","text":"...","rating":5},{"name":"...","role":"...","text":"...","rating":5},{"name":"...","role":"...","text":"...","rating":5}],
  "ctaText": "...",
  "metaTitle": "...",
  "metaDescription": "..."
}
Return only valid JSON, no markdown, no explanation.`;

      const message = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      });

      const text = message.content[0].type === "text" ? message.content[0].text : "";
      generatedContent = JSON.parse(text) as GeneratedContent;
    } else {
      // Mock generation (no API key)
      generatedContent = generateMockContent(formData);
    }

    // Save or update session
    const existing = getSession(sessionId);
    saveSession(sessionId, {
      id: sessionId,
      formData,
      generatedContent,
      createdAt: existing?.createdAt ?? new Date(),
    });

    return NextResponse.json({
      success: true,
      sessionId,
      generatedContent,
      previewUrl: `/preview/${sessionId}`,
    });
  } catch (err) {
    console.error("Generate error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
