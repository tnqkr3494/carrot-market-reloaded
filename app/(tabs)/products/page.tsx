import ListProducts from "@/components/list-product";
import db from "@/lib/db";

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      created_at: true,
      photo: true,
    },
  });
  return products;
}

export default async function Product() {
  const products = await getProducts();
  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        {products.map((product) => (
          <ListProducts key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
