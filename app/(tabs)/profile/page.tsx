import db from "@/lib/db";
import getSession from "@/lib/session";
import {
  CurrencyDollarIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

async function gertUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await gertUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <form action={logOut} className="flex justify-end">
          <button className="flex bg-red-500 p-2 rounded-full font-semibold hover:bg-red-600 transition-colors">
            Log out
          </button>
        </form>
      </div>
      {/* onclick사용안하고 trick으로 사용하는 방법 */}
      <div className="flex items-center gap-5 border-y-2 p-4">
        {user.avatar ? (
          <Image
            className="size-40 rounded-full"
            width={160}
            height={160}
            src={user.avatar}
            alt={user.username}
          />
        ) : null}
        <div>
          <span className="font-semibold text-2xl">
            {user.username}님 환영합니다!
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-4 *:flex *:flex-col *:items-center *:cursor-pointer *:text-xl *:font-semibold">
        <div className="bg-orange-500 p-8 rounded-md hover:bg-orange-600 transition hover:scale-110">
          <CurrencyDollarIcon className="size-20" />
          <span>Sell</span>
        </div>
        <div className="bg-orange-500 p-8 rounded-md hover:bg-orange-600 transition hover:scale-110">
          <ShoppingCartIcon className="size-20" />
          <span>Buy</span>
        </div>
        <div className="bg-orange-500 p-8 rounded-md hover:bg-orange-600 transition hover:scale-110">
          <HeartIcon className="size-20" />
          <span>Like</span>
        </div>
      </div>
    </div>
  );
}
