import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="text" required placeholder="Username" errors={[]} />
        <FormInput type="email" required placeholder="Email" errors={[]} />
        <FormInput
          type="password"
          required
          placeholder="Password"
          errors={[]}
        />
        <FormInput
          type="password"
          required
          placeholder="Confirm Password"
          errors={[]}
        />
        <FormButton loading={true} text="Create account" />
      </form>
      <div className="w-full bg-neutral-500 h-px" />
      <div>
        <Link
          href="/sms"
          className="primary-btn w-full flex justify-center items-center gap-3 h-10"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}
