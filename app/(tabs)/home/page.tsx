import ListProducts from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
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

export default async function Product() {
  const initialProducts = await getCachedProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="size-16 bg-orange-500 text-white flex items-center justify-center rounded-full fixed bottom-24 right-8 transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
