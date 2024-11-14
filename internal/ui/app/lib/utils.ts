export function handleStringNilValue(s: string | undefined) {
  if (s && s !== "nil") {
    return s;
  }
  return "";
}
