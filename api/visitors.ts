import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const headers = {
  "Content-Type": "application/json",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET" || req.method === "POST") {
    try {
      if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        console.error("visitors api error: missing Supabase configuration");
        return res.status(200).json({ count: null, total: null });
      }

      const rawVisitorId =
        req.method === "POST" ? req.body?.visitor_id : req.query?.visitor_id;
      const visitorId =
        typeof rawVisitorId === "string"
          ? rawVisitorId
          : Array.isArray(rawVisitorId)
            ? rawVisitorId[0]
            : undefined;

      if (req.method === "POST" && !visitorId) {
        return res.status(200).json({ count: null, total: null });
      }

      const authHeaders = {
        ...headers,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        apiKey: SUPABASE_SERVICE_ROLE_KEY,
      };

      if (req.method === "POST") {
        const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/visitors`, {
          method: "POST",
          headers: {
            ...authHeaders,
            Prefer: "resolution=ignore-duplicates",
          },
          body: JSON.stringify({ visitor_id: visitorId }),
        });

        if (!insertRes.ok && insertRes.status !== 409) {
          console.error(
            "visitors api error: failed to record visitor",
            await insertRes.text(),
          );
        }
      }

      const countRes = await fetch(
        `${SUPABASE_URL}/rest/v1/visitors?select=count`,
        {
          headers: {
            ...authHeaders,
            Prefer: "count=exact",
          },
        },
      );

      if (!countRes.ok) {
        console.error(
          "visitors api error: failed to read visitor count",
          await countRes.text(),
        );
        return res.status(200).json({ count: null, total: null });
      }

      const countHeader = countRes.headers.get("content-range");
      const total = Number(countHeader?.split("/")[1] ?? 0);

      if (!visitorId) {
        return res.status(200).json({ count: null, total });
      }

      const visitorRes = await fetch(
        `${SUPABASE_URL}/rest/v1/visitors?select=id,created_at&visitor_id=eq.${encodeURIComponent(visitorId)}&limit=1`,
        {
          headers: authHeaders,
        },
      );

      if (!visitorRes.ok) {
        console.error(
          "visitors api error: failed to read visitor row",
          await visitorRes.text(),
        );
        return res.status(200).json({ count: null, total });
      }

      const visitors = (await visitorRes.json()) as Array<{
        id?: number | string;
        created_at?: string;
      }>;
      const visitor = visitors[0];

      if (
        !visitor ||
        visitor.id === undefined ||
        visitor.id === null ||
        !visitor.created_at
      ) {
        return res.status(200).json({ count: null, total });
      }

      const createdAt = encodeURIComponent(visitor.created_at);
      const id = encodeURIComponent(String(visitor.id));
      const rankRes = await fetch(
        `${SUPABASE_URL}/rest/v1/visitors?select=id&or=(created_at.lt.${createdAt},and(created_at.eq.${createdAt},id.lte.${id}))&limit=1`,
        {
          headers: {
            ...authHeaders,
            Prefer: "count=exact",
          },
        },
      );

      if (!rankRes.ok) {
        console.error(
          "visitors api error: failed to read visitor rank",
          await rankRes.text(),
        );
        return res.status(200).json({ count: null, total });
      }

      const rankHeader = rankRes.headers.get("content-range");
      const rankRaw = rankHeader?.split("/")[1];
      const rank = rankRaw !== undefined ? Number(rankRaw) : NaN;

      return res.status(200).json({
        count: Number.isFinite(rank) && rank > 0 ? rank : null,
        total,
      });
    } catch (error) {
      console.error("visitors api error:", error);
      return res.status(200).json({ count: null, total: null });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
}
