export function filterNilIds<T extends { id: any }>(data: T[]): T[] {
  return data.filter(item => item.id !== "nil");
}
