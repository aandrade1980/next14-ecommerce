"use server";

import { createCart, getCart } from "@/lib/db/cart";
import prismaBase from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0 && articleInCart) {
    await prismaBase.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          delete: { id: articleInCart.id },
        },
      },
    });

    return revalidatePath("/cart", "page");
  }

  if (quantity) {
    if (articleInCart) {
      await prismaBase.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: {
            update: {
              where: {
                id: articleInCart.id,
              },
              data: {
                quantity,
              },
            },
          },
        },
      });

      return revalidatePath("/cart", "page");
    }

    await prismaBase.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          create: {
            productId,
            quantity,
          },
        },
      },
    });

    revalidatePath("/cart", "page");
  }
}
