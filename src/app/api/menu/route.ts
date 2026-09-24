import { NextResponse, type NextRequest } from "next/server";
import { getMenuItems } from "@/lib/repositories/menu";
import { clientKey, rateLimit } from "@/lib/rate-limit";

/**
 * Public read-only menu API (future mobile app, admin preview, partners).
 * GET only, rate limited, returns no customer data.
 * Optional filter: /api/menu?category=nyama
 */
const CATEGORY_RE = /^[a-z]{2,20}$/;

export async function GET(req: NextRequest) {
  const limit = rateLimit(`menu:${clientKey(req.headers)}`, { limit: 60, windowMs: 60_000 });
  const headers = {
    "X-RateLimit-Remaining": String(limit.remaining),
    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
  };
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { ...headers, "Cache-Control": "no-store", "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    );
  }

  const category = req.nextUrl.searchParams.get("category");
  if (category !== null && !CATEGORY_RE.test(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400, headers });
  }

  const items = (await getMenuItems()).filter((i) => !category || i.category === category);
  return NextResponse.json({ items }, { headers });
}
