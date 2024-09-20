export default function validateDate(
  field: string,
  dict: any,
) {
  const errors: string[] = [];

  if (typeof field === "string") {
    if (field === "" || field === undefined) {
      errors.push(dict.empty);
    }

    const date: Date = new Date(field);
    if (isNaN(date.getTime())) {
      errors.push(dict.invalid);
    }

  } else {
    errors.push(dict.type);
  }

  return errors;
}

export function dateToISOString(
  field: string
): string {
  const date: Date = new Date(field);
  return date.toISOString();
}

export function dateToLocaleString(
  field: string
): string {
  const date: Date = new Date(field);
  return date.toLocaleString();
}

export function dateToLocaleDateString(
  field: string
): string {
  const date: Date = new Date(field);
  return date.toLocaleDateString();
}

export function dateToLocaleTimeString(
  field: string
): string {
  const date: Date = new Date(field);
  return date.toLocaleTimeString();
}
