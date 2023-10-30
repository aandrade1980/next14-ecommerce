import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
  });

  const firstProduct = products[0];

  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={firstProduct.imageUrl}
            alt={firstProduct.name}
            height={800}
            width={400}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h1 className="text-5xl font-bold">{firstProduct.name}</h1>
            <p className="py-6">{firstProduct.description}</p>
            <Link
              href={`/products/${firstProduct.id}`}
              className="btn btn-primary"
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>

      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(1).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
