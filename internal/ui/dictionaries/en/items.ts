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
  }
}
