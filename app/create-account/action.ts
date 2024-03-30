"use server";
import {
  PASSWORD_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
} from "@/lib/constants";
import { z } from "zod";

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
      .transform((username) => `${username}❤️`)
      .refine(checkUsername, "no kang"),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_ERROR),
    confirm: z.string().min(PASSWORD_MIN_LENGTH),
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
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
