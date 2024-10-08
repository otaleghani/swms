"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString from "../strings";
import validateNumber from "../number";
import validateImages from "../images";
import { getDictionary, Locale } from "@/lib/dictionaries";
import { validateExisting, checkExisting } from "../database";

/** Types and interfaces */
import { FormState } from "../../types/form/form";

/** @todo Validation for archive: boolean */
export async function validateItem(
  state: FormState<"Item">,
  locale: string,
): Promise<FormState<"Item">> {
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
    (state.errorMessages.zoneWithAdd = validateString(
      state.result.zone as string, 
      dict.forms.fields.zones.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Zone", state.result.zone)) {
      state.errorMessages.zoneWithAdd.push(
        dict.forms.fields.zones.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.aisle) {
    (state.errorMessages.aisleWithAdd = validateString(
      state.result.aisle as string, 
      dict.forms.fields.aisles.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Aisle", state.result.aisle)) {
      state.errorMessages.aisleWithAdd.push(
        dict.forms.fields.aisles.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.rack) {
    (state.errorMessages.rackWithAdd = validateString(
      state.result.rack as string, 
      dict.forms.fields.racks.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Rack", state.result.rack)) {
      state.errorMessages.rackWithAdd.push(
        dict.forms.fields.racks.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.shelf) {
    (state.errorMessages.shelfWithAdd = validateString(
      state.result.shelf as string, 
      dict.forms.fields.shelfs.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Shelf", state.result.shelf)) {
      state.errorMessages.shelfWithAdd.push(
        dict.forms.fields.shelfs.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.category) {
    (state.errorMessages.categoryWithAdd = validateString(
      state.result.category as string, 
      dict.forms.fields.categories.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Category", state.result.category)) {
      state.errorMessages.categoryWithAdd.push(
        dict.forms.fields.categories.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.subcategory) {
    (state.errorMessages.subcategoryWithAdd = validateString(
      state.result.subcategory as string, 
      dict.forms.fields.subcategories.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Subcategory", state.result.subcategory)) {
      state.errorMessages.subcategoryWithAdd.push(
        dict.forms.fields.subcategories.validation.not_found);
      state.error = true;
    }
  }

  return state;
}

export async function validateItemComplete(
  state: FormState<"ItemComplete">,
  locale: string,
): Promise<FormState<"ItemComplete">> {
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
    (state.errorMessages.zoneWithAdd = validateString(
      state.result.zone as string, 
      dict.forms.fields.zones.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Zone", state.result.zone)) {
      state.errorMessages.zoneWithAdd.push(
        dict.forms.fields.zones.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.aisle) {
    (state.errorMessages.aisleWithAdd = validateString(
      state.result.aisle as string, 
      dict.forms.fields.aisles.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Aisle", state.result.aisle)) {
      state.errorMessages.aisleWithAdd.push(
        dict.forms.fields.aisles.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.rack) {
    (state.errorMessages.rackWithAdd = validateString(
      state.result.rack as string, 
      dict.forms.fields.racks.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Rack", state.result.rack)) {
      state.errorMessages.rackWithAdd.push(
        dict.forms.fields.racks.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.shelf) {
    (state.errorMessages.shelfWithAdd = validateString(
      state.result.shelf as string, 
      dict.forms.fields.shelfs.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Shelf", state.result.shelf)) {
      state.errorMessages.shelfWithAdd.push(
        dict.forms.fields.shelfs.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.category) {
    (state.errorMessages.categoryWithAdd = validateString(
      state.result.category as string, 
      dict.forms.fields.categories.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Category", state.result.category)) {
      state.errorMessages.categoryWithAdd.push(
        dict.forms.fields.categories.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.subcategory) {
    (state.errorMessages.subcategoryWithAdd = validateString(
      state.result.subcategory as string, 
      dict.forms.fields.subcategories.validation, 
      VALIDATION_SETTINGS.foreignKeys.minLength,
      VALIDATION_SETTINGS.foreignKeys.maxLength,
    )).length != 0 && (state.error = true);

    if (await checkExisting("Subcategory", state.result.subcategory)) {
      state.errorMessages.subcategoryWithAdd.push(
        dict.forms.fields.subcategories.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.images) {
    const { errors, images } = await validateImages(state.result.images)
    if (errors.length != 0) {
      state.errorMessages.images = errors;
      state.error = true;
    } else {
      state.result.images = images;
    }
  }

  if (state.result.identifier) {
    (state.errorMessages.identifier = validateString(
      state.result.identifier as string, 
      dict.forms.fields.identifier.validation, 
      VALIDATION_SETTINGS.mediumString.minLength,
      VALIDATION_SETTINGS.mediumString.maxLength,
    )).length != 0 && (state.error = true);
  }

  (state.errorMessages.quantity = validateNumber(
    String(state.result.quantity), 
    dict.forms.fields.categories.validation, 
    VALIDATION_SETTINGS.bigSignedNumber.minLength,
    VALIDATION_SETTINGS.bigSignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  if (state.result.length) {
    (state.errorMessages.length = validateNumber(
      String(state.result.length), 
      dict.forms.fields.length.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.width) {
    (state.errorMessages.width = validateNumber(
      String(state.result.width), 
      dict.forms.fields.width.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.heigth) {
    (state.errorMessages.heigth = validateNumber(
      String(state.result.heigth), 
      dict.forms.fields.heigth.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.weight) {
    (state.errorMessages.weight = validateNumber(
      String(state.result.weight), 
      dict.forms.fields.weight.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  /** @todo validation for JSON */

  return state;
}
