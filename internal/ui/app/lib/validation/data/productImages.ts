"use server";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { ProductImage } from "../../types/data/images";
import { FormState } from "../../types/misc";

export async function validateProductImage(
  state: FormState<ProductImage>,
  locale: string,
): Promise<FormState<ProductImage>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.emtpy;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "ProductImage", 
      state, 
      state.result.id, 
      locale
    );
  }

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty_after;
    return state;
  }

  // For the validation uri is left befind. Check the ./itemImages.ts
  // for the full explaination.

  (state.errorMessages.product = validateString(
    state.result.product as string, 
    dict.forms.fields.products.validation, 
    /* Min */ -1, 
    /* Max */ 36,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Product", state.result.product)) {
    state.errorMessages.product.push(
      dict.forms.fields.products.validation.not_found)
    state.error = true;
  }

  return state;
}
