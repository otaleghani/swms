export function useActiveFilters(obj: object | undefined): number {
  if (obj) {
    return Object.values(obj).filter(value => 
      value !== undefined && value !== null && value !== "" && 
      !(Array.isArray(value) && value.length === 0)
    ).length;
  }
  return 0
}
