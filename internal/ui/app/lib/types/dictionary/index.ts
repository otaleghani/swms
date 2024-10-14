import { DictAisle } from "./data/aisle";
import { DictCategory } from "./data/category";
import { DictRack } from "./data/rack";
import { DictShelf } from "./data/shelf";
import { DictSubcategory } from "./data/subcategory";
import { DictSupplier } from "./data/supplier";
import { DictSupplierCode } from "./data/supplierCode";
import { DictZone } from "./data/zone"
import { DictForms } from "./form";

export type Dictionary = {
  zone: DictZone;
  aisle: DictAisle;
  rack: DictRack;
  shelf: DictShelf;
  category: DictCategory;
  subcategory: DictSubcategory;
  supplier: DictSupplier;
  supplierCode: DictSupplierCode;
  // item:
  // variant:

  form: DictForms;
}
