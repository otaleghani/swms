import { FormState } from "../form/form";

export type ItemImage = {
  id?: string;
  uri: string;
  item: string;
  //variant: string;
}
export type ItemImagesPostBody = {
  images: File[];
  item: string;
}
export type ItemImages = ItemImage[];

export type ProductImage = {
  id?: string;
  uri: string;
  product: string;
}
export type ProductImages = ProductImage[];
export type ProductImagesPostBody = {
  images: File[];
  product: string;
}

export type ItemImagesFormState = FormState<"ItemImage">
export const defaultItemImagesFormState: ItemImagesFormState = {
  error: false,
  message: "",
  errorMessages: {
    images: [],
    //item: [],
    //variant: [],
  }
}
