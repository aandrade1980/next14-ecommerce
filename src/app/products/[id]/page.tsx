import { cache } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import prismaBase from "@/lib/db/prisma";
import { incrementProductQuantity } from "./actions";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prismaBase.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) notFound();

  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductDetailsPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: `${product.name} - Flowmazon`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

export default async function ProductDetailsPage({
  params: { id },
}: ProductDetailsPageProps) {
  const product = await getProduct(id);

  return (
    <div className="flex flex-col gap-4 lg:flex-row ">
      <Image
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className="rounded-lg"
        priority
      />

      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        <AddToCartButton
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </div>
  );
}
