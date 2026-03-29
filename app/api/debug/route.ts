import { createClient } from "@/lib/prismic";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const client = createClient();
    const docs = await client.getAllByType("doc_page");
    return NextResponse.json({
      ok: true,
      count: docs.length,
      uids: docs.map((d) => d.uid),
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
