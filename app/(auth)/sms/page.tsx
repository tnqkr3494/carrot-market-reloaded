"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useFormState } from "react-dom";
import { smsLogin } from "./action";

const initialState = {
  token: false,
  error: undefined,
};

export default function Home() {
  const [state, action] = useFormState(smsLogin, initialState);
  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">
          {state.token ? "Verify your Token Code" : "Verify your phone number"}
        </h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        {state.token ? (
          <FormInput
            name="token"
            type="number"
            required
            placeholder="Verification code"
            errors={state.error?.formErrors}
          />
        ) : (
          <FormInput
            name="phone"
            type="text"
            required
            placeholder="Phone number"
            errors={state.error?.formErrors}
          />
        )}
        <FormButton loading={false} text="Verify" />
      </form>
    </div>
  );
}
