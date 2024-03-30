"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Invalid Phone Format"
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get("phone");
  const token = formData.get("token");

  // 번호를 입력 할 때(token입력 부분은 가려짐)
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    // 번호를 잘못 입력했을 때
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    }
    // 번호를 잘 입력하면 토큰화면 보여주기
    else {
      return {
        token: true,
      };
    }
  }
  // 번호 입력 후 토큰 입력
  else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
}
