import { DictAisle } from "./data/aisle";
import { DictCategory } from "./data/category";
import { DictRack } from "./data/rack";
import { DictShelf } from "./data/shelf";
import { DictSubcategory } from "./data/subcategory";
import { DictSupplier } from "./data/supplier";
import { DictSupplierCode } from "./data/supplierCode";
import { DictZone } from "./data/zone"
import { DictForms } from "./form";
import { DictToasts } from "./toasts";
import { DictFilters } from "./misc";
import { DictPages } from "./pages";

/** Every one-off term that do not fit in any cat */
export interface DictMisc {
  notFound: string;
}

export type Dictionary = {
  zone: DictZone;
  aisle: DictAisle;
  rack: DictRack;
  shelf: DictShelf;
  category: DictCategory;
  subcategory: DictSubcategory;
  supplier: DictSupplier;
  supplierCode: DictSupplierCode;

  pages: DictPages;

  form: DictForms;
  toasts: DictToasts;
  filters: DictFilters;
  misc: DictMisc;
}
