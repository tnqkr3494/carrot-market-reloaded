"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { smsLogin } from "./action";

export default function Home() {
  const [state, action] = useFormState(smsLogin, null);
  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">Verify your phone number</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="phone"
          type="number"
          required
          placeholder="Phone number"
        />
        <FormInput
          name="token"
          type="number"
          required
          placeholder="Verification code"
        />
        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  );
}
