import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${params}`;
  const tokenResponse = await (
    await fetch(accessTokenURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("error" in tokenResponse) {
    return new Response(null, {
      status: 400,
    });
  }
  return Response.json({ tokenResponse });
}
