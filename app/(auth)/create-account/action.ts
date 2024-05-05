"use server";

import bcrypt from "bcrypt";

import {
  PASSWORD_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkUsername = (username: string) => {
  return !username.includes("kang");
};

const checkPassword = ({
  password,
  confirm,
}: {
  password: string;
  confirm: string;
}) => {
  return password === confirm;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "User name must be string",
        required_error: "User name is required",
      })
      .min(5, "Too Short")
      .max(10, "Too Long")
      .toLowerCase()
      //.transform((username) => `${username}❤️`)
      .refine(checkUsername, "no kang"),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_ERROR),
    confirm: z.string().min(PASSWORD_MIN_LENGTH),
  })
  //superRefine : 다른 아래 refine코드들을 동작시키지 않게 할 수 있다.(데이터베이스 여러번 호출 방지)
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });
    //이미 존재하는 username이면
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        username: true,
      },
    });
    //이미 존재하는 email이면
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "Both Passwords should be the same!",
    path: ["confirm"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  };
  //safeParseAsync : If you use asynchronous refinements or transforms (more on those later), you'll need to use -zod 공식문서
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/profile");
  }
}
