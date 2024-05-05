import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${params}`;
  const { error, access_token } = await (
    await fetch(accessTokenURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if (error) {
    // new를 사용해서 Response 설정하기
    return new Response(null, {
      status: 400,
    });
  }
  const { login, id, avatar_url } = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-cache",
    })
  ).json();
  /* 
  no-cache 사용 이유 : nextjs14버전에서 fetch하면 그 값을 자동으로 캐싱한다.
  캐싱한 데이터는 서버를 다시 껐다가 키지 않는한 계속 캐싱상태가 유지된다.
  하지만 우리가 원하는 것은 최신의 user data를 얻어오고 싶은것이다. 
  따라서 캐싱을 취소하는 의미로 코드를 사용함.
  */
  const user = await db.user.findUnique({
    where: {
      github_id: String(id),
    },
    select: {
      id: true,
    },
  });
  // user가 기존에 존재하는 user면 바로 로그인 직행
  if (user) {
    const session = await getSession();
    session.id = user.id;
    await session.save();
    return redirect("/profile");
  }

  const newUser = await db.user.create({
    data: {
      github_id: String(id),
      username: login,
      avatar: avatar_url,
    },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();
  return redirect("/profile");
}
