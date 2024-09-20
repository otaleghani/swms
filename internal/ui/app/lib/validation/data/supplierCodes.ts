"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { SupplierCode } from "../../types/data/supplierCodes";
import { FormState } from "../../types/misc";

export async function validateSupplierCode(
  state: FormState<SupplierCode>,
  locale: string,
): Promise<FormState<SupplierCode>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "SupplierCode", 
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

  (state.errorMessages.code = validateString(
    state.result.code as string, 
    dict.forms.fields.codes.validation, 
    VALIDATION_SETTINGS.mediumString.minLength,
    VALIDATION_SETTINGS.mediumString.maxLength,
  )).length != 0 && (state.error = true);

  (state.errorMessages.supplier = validateString(
    state.result.supplier as string, 
    dict.forms.fields.suppliers.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Supplier", state.result.supplier)) {
    state.errorMessages.supplier.push(
      dict.forms.fields.suppliers.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.item = validateString(
    state.result.item as string, 
    dict.forms.fields.items.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Item", state.result.item)) {
    state.errorMessages.item.push(
      dict.forms.fields.items.validation.not_found);
    state.error = true;
  }

  (state.errorMessages.variant = validateString(
    state.result.variant as string, 
    dict.forms.fields.variants.validation, 
    VALIDATION_SETTINGS.foreignKeys.minLength,
    VALIDATION_SETTINGS.foreignKeys.maxLength,
  )).length != 0 && (state.error = true);

  if (await checkExisting("Variant", state.result.variant)) {
    state.errorMessages.variant.push(
      dict.forms.fields.variants.validation.not_found);
    state.error = true;
  }

  return state;
}
