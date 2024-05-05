import Image from "next/image";
import Link from "next/link";

interface ListProductsProps {
  id: number;
  title: string;
  price: number;
  created_at: Date;
  photo?: string | null;
}

export default function ListProducts({
  id,
  title,
  price,
  created_at,
  photo,
}: ListProductsProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-28 rounded-md overflow-hidden">
        {!photo ? (
          <div className="absolute bg-slate-500 size-28 flex items-center justify-center">
            <span className="text-white">No img</span>
          </div>
        ) : (
          <Image fill src={photo} alt={title} quality={100} />
        )}
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-lg">{title}</span>
        <span className="text-sm text-neutral-500">
          {created_at.toString()}
        </span>
        <span className="text-lg font-semibold">{price}</span>
      </div>
    </Link>
  );
}
