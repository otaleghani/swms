import { DictItem } from "@/app/lib/types/dictionary/data/item";
import { Breadcrumb } from "@/app/ui/components/breadcrumb";

export const dictionaryItems: DictItem = {
  header: {
    title: "Items",
    breadcrumbs: {
      home: "Home",
      item: "Items",
      add: "New item",
    },
  },
  form: {
    sections: {
      basics: "Basics",
      defaultVariant: "Default variant",
      position: "Position",
      images: "Images",
      variants: "Position",
    }
  },
  dialogs: {
    add: {
      title: "Add a new item",
      description: "Use this form to add a new item",
      trigger: { label: "Add item" },
      clear: "Clear"
    },
    replace: {
      title: "Replace this item",
      description: "Choose another item to replace",
      trigger: { label: "Replace item" },
      clear: "Clear"
    },
    delete: {
      title: "Delete this item",
      description: "Are you sure that you want to delete this item?",
      trigger: { label: "Delete item" },
      clear: "Clear"
    },
    edit: {
      title: "Edit this item",
      description: "Use this form to edit this item",
      trigger: { label: "Edit item" },
      clear: "Clear"
    },
  }
}
