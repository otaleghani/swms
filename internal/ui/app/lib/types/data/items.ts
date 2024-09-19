export type Item = {
  id?: string;
  name: string;
  description: string;
  archive: boolean;
  zone: string;
  aisle: string;
  rack: string;
  shelf: string;
  category: string;
  subcategory: string;
}
export type Items = Item[];
