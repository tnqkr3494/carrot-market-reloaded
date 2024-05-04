import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

// session을 받아온다(쿠키). 받아올 값이 없으면 새로 생성도 시켜줌.
// password로 encrypt, decrypt 동작함. -> 생성시 encrypt, 불러올 때 decrypt
export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "carrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}
