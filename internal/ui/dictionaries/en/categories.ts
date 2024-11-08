import { DictCategory } from "@/app/lib/types/dictionary/data/category";

export const dictionaryCategories: DictCategory = {
  header: {
    title: "Categories",
    breadcrumbs: {
      home: "Home",
      category: "Categories",
    }
  },
  card: {
    labels: {
      subcategories: "Subcategories",
      items: "Items",
    }
  },
  dialogs: {
    add: {
      title: "Add a new category",
      description: "Use this for for to add a new category.",
      trigger: {
        label: "Add category",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace category",
      description: "Delete this category and assign it's items to another",
      trigger: {
        label: "Replace category",
      },
      clear: "Clear",
    },
    delete: {
      title: "Delete category",
      description: "Nukes this category. All of the data associated with this would also be deleted. This operation is not reversable.",
      trigger: {
        label: "Delete category",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit category",
      description: "Edit this category with new data",
      trigger: {
        label: "Edit category",
      },
      clear: "Clear",
    },
  }
}
