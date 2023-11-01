"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

const quantityOptions: JSX.Element[] = [];

for (let i = 1; i <= 99; i++) {
  quantityOptions.push(
    <option value={i} key={i}>
      {i}
    </option>,
  );
}

console.log({ quantityOptions });

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={200}
          width={200}
          className="rounded-lg"
        />
      </div>
      <div>
        <Link href={`/products/${product.id}`} className="font-bold">
          {product.name}
        </Link>
        <div>Price: {formatPrice(product.price)}</div>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select>{quantityOptions}</select>
        </div>
        <div className="flex items-center gap-3">
          Total: {formatPrice(product.price * quantity)}d
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
