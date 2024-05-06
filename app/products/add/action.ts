"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  //photo problem(/undefined)
  photo: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.coerce.number().min(1, { message: "Price is required" }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };

  if (data.photo instanceof File) {
    if (data.photo.type.startsWith("image/")) {
      if (data.photo.size > 3145728) {
        return {
          fieldErrors: {
            photo: "Please upload image file less then 3MB size",
            title: [""],
            price: [""],
            description: [""],
          },
        };
      } else if (data.photo.size > 0 && data.photo.size <= 3145728) {
        const photoData = await data.photo.arrayBuffer();
        await fs.appendFile(
          `./public/${data.photo.name}`,
          Buffer.from(photoData)
        );
        data.photo = `/${data.photo.name}`;
      } else {
        return {
          fieldErrors: {
            photo: ["Photo is required"],
            title: [""],
            price: [""],
            description: [""],
          },
        };
      }
    } else {
      return {
        fieldErrors: {
          photo: ["Please upload image file"],
          title: [""],
          price: [""],
          description: [""],
        },
      };
    }
  }
  const result = await productSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          photo: result.data.photo as any,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
      //redirect("/products")
    }
  }
}
