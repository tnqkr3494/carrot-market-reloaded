"use server";
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
      .refine(checkUsername, "no kang"),
    email: z.string().email(),
    password: z.string().min(10),
    confirm: z.string().min(10),
  })
  .refine(checkPassword, {
    message: "Both Passwords should be the same!",
    path: ["confirm"],
  });

export default async function createAccount(
  prevState: any,
  formData: FormData
) {
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
