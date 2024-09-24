export function addNewItemToList<T>(
  item: T, 
  list: T[] | undefined,
  setList: React.Dispatch<React.SetStateAction<T[] | undefined>>,
) {
  const newList = list
  newList.push(item);
  setList(newList);
}

export function filterList<T, K extends keyof T>(
  list: T[] | undefined,
  field: K | undefined,
  value: string | undefined,
  setFilteredList: React.Dispatch<React.SetStateAction<T[] | undefined>>,
) {
  const newList = list.filter(item => item[field as K] === value);
  setFilteredList(newList);
}
