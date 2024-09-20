"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { Item } from "../../types/data/items";
import { FormState } from "../../types/misc";

/** @todo Validation for archive: boolean */
export async function validateItem(
  state: FormState<Item>,
  locale: string,
): Promise<FormState<Item>> {
  const dictPromise = getDictionary(locale as Locale);
  const [ dict ] = await Promise.all([ dictPromise ]);

  if (!state.result) {
    state.error = true;
    state.errorMessages = dict.forms.messages.errors.empty;
    return state;
  }

  if (state.result.id) {
    state = await validateExisting(
      "Item", 
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

  (state.errorMessages.name = validateString(
    state.result.name as string, 
    dict.forms.fields.name.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  if (state.result.category) {
    (state.errorMessages.description = validateString(
      state.result.description as string, 
      dict.forms.fields.description.validation, 
      VALIDATION_SETTINGS.longString.minLength,
      VALIDATION_SETTINGS.longString.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.zone) {
    (state.errorMessages.zone = validateString(
      state.result.zone as string, 
      dict.forms.fields.zones.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Zone", state.result.zone)) {
      state.errorMessages.zone.push(
        dict.forms.fields.zones.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.aisle) {
    (state.errorMessages.aisle = validateString(
      state.result.aisle as string, 
      dict.forms.fields.aisles.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Aisle", state.result.aisle)) {
      state.errorMessages.aisle.push(
        dict.forms.fields.aisles.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.rack) {
    (state.errorMessages.rack = validateString(
      state.result.rack as string, 
      dict.forms.fields.racks.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Rack", state.result.rack)) {
      state.errorMessages.rack.push(
        dict.forms.fields.racks.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.shelf) {
    (state.errorMessages.shelf = validateString(
      state.result.shelf as string, 
      dict.forms.fields.shelfs.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Shelf", state.result.shelf)) {
      state.errorMessages.shelf.push(
        dict.forms.fields.shelfs.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.category) {
    (state.errorMessages.category = validateString(
      state.result.category as string, 
      dict.forms.fields.categories.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Category", state.result.category)) {
      state.errorMessages.category.push(
        dict.forms.fields.categories.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.subcategory) {
    (state.errorMessages.subcategory = validateString(
      state.result.subcategory as string, 
      dict.forms.fields.subcategories.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Subcategory", state.result.subcategory)) {
      state.errorMessages.subcategory.push(
        dict.forms.fields.subcategories.validation.not_found);
      state.error = true;
    }
  }

  return state;
}
