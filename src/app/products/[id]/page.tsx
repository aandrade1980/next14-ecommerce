import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailsPage({
  params: { id },
}: ProductDetailsPageProps) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) notFound();


  return (
    <div className="flex flex-col lg:flex-row">
      <Image 
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className="rounded-lg"
        
      />
    </div>
  )
}
