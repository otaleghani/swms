import { DictSelectFieldValidation } from "../types/dictionary/form";

export default function validateString(
  field: string, 
  dict: any,
  min: number,
  max: number,
) {
  const errors: string[] = [];
  if (typeof field === "string") {
    if (field === "" || field === undefined) {
      errors.push(dict.empty);
      return errors;
    }
    const length = field.length;
    if (length > max) {
      const error = dict.max.replace("{{max}}", max)
      errors.push(error);
    } else if (length < min) {
      const error = dict.min.replace("{{min}}", min)
      errors.push(error)
    }
  } else {
    errors.push(dict.type)
  }
  return errors;
}

type ValidateForeignString = {
  field: string;
  dict: DictSelectFieldValidation;
  required: boolean;
}

export function validateForeignString({
  field,
  dict,
  required
}: ValidateForeignString) {

  const errors: string[] = [];

  if (typeof field !== "string") {
    errors.push(dict.valid);
    return errors;
  }

  if (required && (field === "" || field === undefined)) {
    errors.push(dict.empty);
    return errors;
  }
  if (required && field.length !== 36) {
    errors.push(dict.valid);
    return errors;
  }

  return [];
}
