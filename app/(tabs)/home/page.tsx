import ListProducts from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { revalidatePath, unstable_cache } from "next/cache";
import Link from "next/link";

const getCachedProducts = unstable_cache(
  getInitialProducts,
  ["home-products"],
  // revalidate : 60초마다 실행되는 것이 아니라 이 함수를 최초 실행한지 60초 지난 후 또 실행되면 그때 cache를 새로 변경
  { revalidate: 60 }
);

async function getInitialProducts() {
  console.log("hi");
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export const metadata = {
  title: "Home",
};

// 아래 두 줄 코드는 npm run build상태에서 npm run start를 실행시키면 볼 수 있는 상태
// force-dynamic : 원래 static페이지로 추출하는데 동적인 페이지로 변경시킴 -> 새로고침할 때마다 계속 db접근

//export const dynamic = "force-dynamic"

export const revalidate = 60;
// revalidate -> 우선 static으로 추출하고 60초후 새로고침을 하면 db에서 값을 새로 불러옴

//nextjs build방식 : 해당 페이지를 누가 보느냐에 따라 달라지면 dynamic, 아니면 static

export default async function Product() {
  const initialProducts = await getCachedProducts();
  const revalidate = async () => {
    "use server";
    revalidatePath("/home");
  };
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <button>Revalidate</button>
      </form>
      <Link
        href="/products/add"
        className="size-16 bg-orange-500 text-white flex items-center justify-center rounded-full fixed bottom-24 right-8 transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
