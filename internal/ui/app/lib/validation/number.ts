export default function validateNumber(
  field: string,
  dict: any,
  min: number,
  max: number,
) {
  const errors: string[] = [];

  if (typeof field === "string") {
    if (field === "" || field === undefined) {
      errors.push(dict.empty);
    }
    if (isNaN(Number(field)) || !isFinite(Number(field))) {
      errors.push(dict.not_valid);
    }
    if (Number(field) > max) {
      const error = dict.max.replace("{{max}}", max)
      errors.push(error);
    } else if (Number(field) < min) {
      const error = dict.min.replace("{{min}}", min)
      errors.push(error);
    }
  } else {
    errors.push(dict.type)
  }
  return errors;
}
