"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./action";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          required
          placeholder="Username"
          minLength={5}
          maxLength={10}
          errors={state?.fieldErrors.username}
        />
        <FormInput
          name="email"
          type="email"
          required
          placeholder="Email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          type="password"
          required
          placeholder="Password"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <FormInput
          name="confirm"
          type="password"
          required
          placeholder="Confirm Password"
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.confirm}
        />
        <FormButton loading={false} text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
