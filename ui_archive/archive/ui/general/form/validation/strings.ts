export default function validateString(
  field: string, 
  dict: any,
  min: number,
  max: number,
) {
  const errors: string[] = [];
  if (typeof field === "string") {
    if (field === "" || field === undefined) {
      errors.push(dict.empty)
    }
    const length = field.length;
    if (length > max) {
      const error = dict.max.replace("{{max}}", max)
      errors.push(error)
    } else if (length < min) {
      const error = dict.min.replace("{{min}}", min)
      errors.push(error)
    }
  } else {
    errors.push(dict.type)
  }
  return errors;
}
