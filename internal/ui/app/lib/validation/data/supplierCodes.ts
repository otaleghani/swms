"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString, { validateForeignString } from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

export async function validateSupplierCode(
  state: FormState<"SupplierCode">,
  locale: string,
): Promise<FormState<"SupplierCode">> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  if (state.result.id && state.result.id !== "") {
    state = await validateExisting(
      "SupplierCode", 
      state, 
      state.result.id, 
      locale
    );
  }

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty_after;
    return state;
  }

  (state.errorMessages.code = validateString(
    state.result.code as string, 
    dict.form.fields.codes.validation, 
    VALIDATION_SETTINGS.mediumString.minLength,
    VALIDATION_SETTINGS.mediumString.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.supplier = validateForeignString({
    field: state.result.supplier,
    dict: dict.form.fields.suppliers.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Supplier", state.result.supplier)) {
    state.errorMessages.supplier.push(
      dict.form.fields.suppliers.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.item = validateForeignString({
    field: state.result.item,
    dict: dict.form.fields.items.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Item", state.result.item)) {
    state.errorMessages.item.push(
      dict.form.fields.items.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.variant = validateForeignString({
    field: state.result.variant,
    dict: dict.form.fields.variants.validation, 
    required: true,
  })).length != 0 && (state.error = true);

  if (!await checkExisting("Variant", state.result.variant)) {
    state.errorMessages.variant.push(
      dict.form.fields.variants.validation.not_found);
    state.error = true;
  }

  return state;
}
