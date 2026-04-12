import { NextRequest, NextResponse } from "next/server";
import { getSession, saveSession } from "@/lib/sessions";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const session = getSession(id);
  if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(session);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const id = crypto.randomUUID();
  saveSession(id, { id, formData: body.formData, createdAt: new Date() });
  return NextResponse.json({ sessionId: id });
}
