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
import { dictionaryToasts } from "./en/toasts"
import { dictionaryFilters } from "./en/filters"
import { dictionaryPages } from "./en/pages"
import { dictionarySidebar } from "./en/sidebar"
import { dictionaryItems } from "./en/items"

export const dictionary: Dictionary = {
  zone: dictionaryZones,
  aisle: dictionaryAisles,
  rack: dictionaryRacks,
  shelf: dictionaryShelfs,
  category: dictionaryCategories,
  subcategory: dictionarySubcategories,
  supplier: dictionarySuppliers,
  supplierCode: dictionarySupplierCodes,
  item: dictionaryItems,

  form: dictionaryForm,
  toasts: dictionaryToasts,
  filters: dictionaryFilters,
  misc: {
    notFound: "Nothing was found.",
    pageNotFound: {
      title: "Error 404, not found",
      description: "The resource that you asked was not found in the db.",
      buttonLabel: "Go back to the dashboard",
    }
  },

  pages: dictionaryPages,
  sidebar: dictionarySidebar,
}
