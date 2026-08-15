import type { NextRequest } from "next/server";
import { GACHA_LOG_PATH } from "@/features/import/domain/url";

/**
 * Server-side proxy for the HoYoVerse wish-history endpoint.
 *
 * The HoYoVerse API does not send `Access-Control-Allow-Origin`, so browsers
 * block direct cross-origin fetches once the app is served from a domain such
 * as `*.vercel.app`. This route performs the request server-side (Node, no
 * CORS) and mirrors the JSON response to the client.
 *
 * Not an open proxy: only the two known operation hosts and the exact
 * `getGachaLog` path are allowed.
 */

const ALLOWED_HOSTS = new Set([
  "public-operation-hk4e-sg.hoyoverse.com",
  "public-operation-hk4e.mihoyo.com",
]);

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get("url");
  if (!target) {
    return Response.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(target);
  } catch {
    return Response.json({ error: "Invalid url parameter" }, { status: 400 });
  }

  if (parsed.protocol !== "https:") {
    return Response.json({ error: "Only https URLs are allowed" }, { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(parsed.hostname)) {
    return Response.json({ error: "Host not allowed" }, { status: 400 });
  }
  if (parsed.pathname !== `/${GACHA_LOG_PATH}`) {
    return Response.json({ error: "Path not allowed" }, { status: 400 });
  }

  const upstream = await fetch(parsed.toString(), {
    headers: { Accept: "application/json" },
  });

  if (!upstream.ok) {
    return Response.json(
      { error: `Upstream request failed with status ${upstream.status}` },
      { status: 502 }
    );
  }

  const payload: unknown = await upstream.json();
  return Response.json(payload);
}