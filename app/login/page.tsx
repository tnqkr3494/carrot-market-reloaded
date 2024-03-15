import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">Log in with email and password</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="email" required placeholder="Email" errors={[]} />
        <FormInput
          type="password"
          required
          placeholder="Password"
          errors={[]}
        />
        <FormButton loading={false} text="Login" />
      </form>
      <SocialLogin />
    </div>
  );
}
