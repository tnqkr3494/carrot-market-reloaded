import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Home() {
  return (
    <div className="py-8 px-6 gap-10 flex flex-col">
      <div className="font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="mt-3">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          required
          placeholder="Username"
          errors={[]}
        />
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
          errors={[]}
        />
        <FormInput
          name="confirm"
          type="password"
          required
          placeholder="Confirm Password"
          errors={[]}
        />
        <FormButton loading={false} text="Create account" />
      </form>
      <SocialLogin />
    </div>
  );
}
