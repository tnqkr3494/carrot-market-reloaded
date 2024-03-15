import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-between min-h-screen items-center p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <span className="text-9xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className="text-2xl">당근 마켓에 어서오세요!</h2>
      </div>
      <div className="flex flex-col gap-3 w-full items-center">
        <Link
          href="/create-account"
          className="bg-orange-500 text-white w-full text-center py-2.5 rounded-md text-lg font-medium
          hover:bg-orange-400 transition-colors
          "
        >
          시작하기
        </Link>
        <div>
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
