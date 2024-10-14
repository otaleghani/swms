import { Dictionary } from "@/app/lib/types/dictionary"
import { dictionaryZones } from "./en/zones"
import { dictionaryAisles } from "./en/aisles"
import { dictionaryRacks } from "./en/racks"
import { dictionaryShelfs } from "./en/shelfs"
import { dictionaryCategories } from "./en/categories"
import { dictionarySubcategories } from "./en/subcategories"
import { dictionarySuppliers } from "./en/suppliers"
import { dictionarySupplierCodes } from "./en/supplierCodes"
import { dictionaryForm } from "./en/form"

export const dictionary: Dictionary = {
  zone: dictionaryZones,
  aisle: dictionaryAisles,
  rack: dictionaryRacks,
  shelf: dictionaryShelfs,
  category: dictionaryCategories,
  subcategory: dictionarySubcategories,
  supplier: dictionarySuppliers,
  supplierCode: dictionarySupplierCodes,
  form: dictionaryForm,
}
