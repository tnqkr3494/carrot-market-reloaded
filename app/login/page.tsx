"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { handleForm } from "./action";

export default function Home() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">Log in with email and password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          required
          placeholder="Email"
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          required
          placeholder="Password"
          errors={state?.error ?? []}
        />
        <FormButton loading={false} text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
