import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">Fill in the form below to join!</h2>
      </div>
      <form>
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            required
            className="h-10 bg-transparent rounded-md ring-neutral-200 border-none ring-1 focus:outline-none focus:ring-orange-500 focus:ring-2 peer valid:mb-10"
          />
          <span className="my-3 text-red-500 font-semibold hidden peer-invalid:block">
            Input error
          </span>
        </div>
        <button className="primary-btn h-10">Create account</button>
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
