"use server" 

import { FormMap, FormState } from "@/app/lib/types/form/form"
import { create } from "@/app/lib/requests/generics/create";
import validateResponse from "@/app/lib/validation/response";
import { Product, ProductWithImages } from "@/app/lib/types/data/products";
import { remove } from "@/app/lib/requests/generics/remove";
import { ProductImagesPostBody } from "@/app/lib/types/data/images";

export async function createProduct<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  const response = await create(
    "Product", 
    state.result as Product
  );
  const stateValidation = await validateResponse(
    response,
    state as FormState<"Product">, 
    locale as string
  );
  return stateValidation;
}

export async function createProductWithImages<K extends keyof FormMap>(
  state: FormState<K>,
  locale: string
){
  let resultProductWithImages = state.result as ProductWithImages;
  const product: Product = resultProductWithImages;

  let rProduct = await create(
    "Product", 
    product,
  );
  let stateValidation = await validateResponse(
    rProduct,
    state as FormState<"ProductWithImages">, 
    locale as string
  );
  if (stateValidation.error === true ||
      rProduct.data?.uuid === undefined) {
    remove("Product", rProduct.data?.uuid as string)
    return stateValidation;
  }
  const productUUID = rProduct.data.uuid;

  const productImages: ProductImagesPostBody = {
    product: productUUID,
    images: resultProductWithImages.images
  }

  let rProductImages = await create(
    "ProductImagesPostBody", 
    productImages
  );
  stateValidation = await validateResponse(
    rProductImages,
    state as FormState<"ProductWithImages">, 
    locale as string
  );
  if (stateValidation.error === true ||
      rProductImages.data?.uuid === undefined) {
    remove("Product", productUUID);
    return stateValidation;
  }
  return stateValidation;
}
