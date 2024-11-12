"use server";

/** Constants */
import { VALIDATION_SETTINGS } from "../validation.config";

/** Actions */
import validateString, { validateForeignString } from "../strings";
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
    state.message = dict.form.messages.errors.empty;
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
    state.message = dict.form.messages.errors.empty_after;
    return state;
  }

  (state.errorMessages.name = validateString(
    state.result.name as string, 
    dict.form.fields.name.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  if (state.result.category) {
    (state.errorMessages.description = validateString(
      state.result.description as string, 
      dict.form.fields.description.validation, 
      VALIDATION_SETTINGS.longString.minLength,
      VALIDATION_SETTINGS.longString.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.zone) {
    (state.errorMessages.zoneWithAdd = validateForeignString({
      field: state.result.zone,
      dict: dict.form.fields.zones.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Zone", state.result.zone)) {
      state.errorMessages.zoneWithAdd.push(
        dict.form.fields.zones.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.aisle) {
    (state.errorMessages.aisleWithAdd = validateForeignString({
      field: state.result.aisle,
      dict: dict.form.fields.aisles.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Aisle", state.result.aisle)) {
      state.errorMessages.aisleWithAdd.push(
        dict.form.fields.aisles.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.rack) {
    (state.errorMessages.rackWithAdd = validateForeignString({
      field: state.result.rack,
      dict: dict.form.fields.racks.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Rack", state.result.rack)) {
      state.errorMessages.rackWithAdd.push(
        dict.form.fields.racks.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.shelf) {
    (state.errorMessages.shelfWithAdd = validateForeignString({
      field: state.result.shelf,
      dict: dict.form.fields.shelfs.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Shelf", state.result.shelf)) {
      state.errorMessages.shelfWithAdd.push(
        dict.form.fields.shelfs.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.category) {
    (state.errorMessages.categoryWithAdd = validateForeignString({
      field: state.result.category,
      dict: dict.form.fields.categories.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Category", state.result.category)) {
      state.errorMessages.categoryWithAdd.push(
        dict.form.fields.categories.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.subcategory) {
    (state.errorMessages.subcategoryWithAdd = validateForeignString({
      field: state.result.subcategory,
      dict: dict.form.fields.subcategories.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Subcategory", state.result.subcategory)) {
      state.errorMessages.subcategoryWithAdd.push(
        dict.form.fields.subcategories.validation.not_found);
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
    state.message = dict.form.messages.errors.empty;
    return state;
  }

  //if (state.result.id) {
  //  state = await validateExisting(
  //    "Item", 
  //    state, 
  //    state.result.id, 
  //    locale
  //  );
  //}

  if (!state.result) {
    state.error = true;
    state.message = dict.form.messages.errors.empty_after;
    return state;
  }

  (state.errorMessages.name = validateString(
    state.result.name as string, 
    dict.form.fields.name.validation, 
    VALIDATION_SETTINGS.shortString.minLength,
    VALIDATION_SETTINGS.shortString.maxLength,
  )).length != 0 && (state.error = true);

  if (state.result.category) {
    (state.errorMessages.description = validateString(
      state.result.description as string, 
      dict.form.fields.description.validation, 
      VALIDATION_SETTINGS.longString.minLength,
      VALIDATION_SETTINGS.longString.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.zone) {
    (state.errorMessages.zoneWithAdd = validateForeignString({
      field: state.result.zone,
      dict: dict.form.fields.zones.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Zone", state.result.zone)) {
      state.errorMessages.zoneWithAdd.push(
        dict.form.fields.zones.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.aisle) {
    (state.errorMessages.aisleWithAdd = validateForeignString({
      field: state.result.aisle,
      dict: dict.form.fields.aisles.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Aisle", state.result.aisle)) {
      state.errorMessages.aisleWithAdd.push(
        dict.form.fields.aisles.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.rack) {
    (state.errorMessages.rackWithAdd = validateForeignString({
      field: state.result.rack,
      dict: dict.form.fields.racks.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Rack", state.result.rack)) {
      state.errorMessages.rackWithAdd.push(
        dict.form.fields.racks.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.shelf) {
    (state.errorMessages.shelfWithAdd = validateForeignString({
      field: state.result.shelf,
      dict: dict.form.fields.shelfs.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Shelf", state.result.shelf)) {
      state.errorMessages.shelfWithAdd.push(
        dict.form.fields.shelfs.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.category) {
    (state.errorMessages.categoryWithAdd = validateForeignString({
      field: state.result.category,
      dict: dict.form.fields.categories.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Category", state.result.category)) {
      state.errorMessages.categoryWithAdd.push(
        dict.form.fields.categories.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.subcategory) {
    (state.errorMessages.subcategoryWithAdd = validateForeignString({
      field: state.result.subcategory,
      dict: dict.form.fields.subcategories.validation, 
      required: true,
    })).length != 0 && (state.error = true);

    if (await checkExisting("Subcategory", state.result.subcategory)) {
      state.errorMessages.subcategoryWithAdd.push(
        dict.form.fields.subcategories.validation.not_found);
      state.error = true;
    }
  }

  if (state.result.images) {
    const { errors, images } = await validateImages(state.result.images)
    if (errors.length != 0) {
      state.errorMessages.images = errors;
      state.error = true;
    } else {
      state.result.encodedImages = images;
    }
  }

  if (state.result.identifier) {
    (state.errorMessages.identifier = validateString(
      state.result.identifier as string, 
      dict.form.fields.identifier.validation, 
      VALIDATION_SETTINGS.mediumString.minLength,
      VALIDATION_SETTINGS.mediumString.maxLength,
    )).length != 0 && (state.error = true);
  }

  (state.errorMessages.quantity = validateNumber(
    String(state.result.quantity), 
    dict.form.fields.categories.validation, 
    VALIDATION_SETTINGS.bigSignedNumber.minLength,
    VALIDATION_SETTINGS.bigSignedNumber.maxLength,
  )).length != 0 && (state.error = true);

  if (state.result.length) {
    (state.errorMessages.length = validateNumber(
      String(state.result.length), 
      dict.form.fields.length.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.width) {
    (state.errorMessages.width = validateNumber(
      String(state.result.width), 
      dict.form.fields.width.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.heigth) {
    (state.errorMessages.heigth = validateNumber(
      String(state.result.heigth), 
      dict.form.fields.height.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  if (state.result.weight) {
    (state.errorMessages.weight = validateNumber(
      String(state.result.weight), 
      dict.form.fields.weight.validation, 
      VALIDATION_SETTINGS.bigUnsignedNumber.minLength,
      VALIDATION_SETTINGS.bigUnsignedNumber.maxLength,
    )).length != 0 && (state.error = true);
  }

  /** @todo validation for JSON */

  return state;
}
