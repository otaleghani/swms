import { DictSubcategory } from "@/app/lib/types/dictionary/data/subcategory";

export const dictionarySubcategories: DictSubcategory = {
  header: {
    title: "Subcategories",
    breadcrumbs: {
      home: "Home",
      category: "Categories",
      subcategory: "Subcategories",
    }
  },
  card: {
    labels: {items: "Items"},
  },
  dialogs: {
    add: {
      title: "Add subcategory",
      description: "Add a new subcategory with this form",
      trigger: {
        label: "Add subcategory",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace subcategory",
      description: "Delete this subcategory and assign it's items to another",
      trigger: {
        label: "Replace subcategory",
      },
      clear: "Clear",
    },
    delete: {
      title: "Delete subcategory",
      description: "Nukes this subcategory. All of the data associated with this would also be deleted. This operation is not reversable.",
      trigger: {
        label: "Delete subcategory",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit subcategory",
      description: "Edit this subcategory with new data",
      trigger: {
        label: "Edit subcategory",
      },
      clear: "Clear",
    },
  }
  
}
