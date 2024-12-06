import { DictVariant } from "@/app/lib/types/dictionary/data/variant";

export const dictionaryVariant: DictVariant = {
  card: {
    labels: {
      dimensions: "Dimensions",
      weight: "Weight",
      quantity: "Quantity",
      identifier: "Identifier",
    }
  },
  dialogs: {
    edit: {
      title: "Edit variant",
      description: "Edit a new variant with this form.",
      trigger: {
        label: "Edit variant",
      },
      clear: "Clear",
    },
    delete: {
      title: "Delete variant",
      description: "All of the data associated with this variant will be deleted too.",
      trigger: {
        label: "Delete variant",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace variant",
      description: "Delete this variant and assign it's associated data to another.",
      trigger: {
        label: "Replace variant",
      },
      clear: "Clear",
    },
    add: {
      title: "New variant",
      description: "Add a new variant with this form.",
      trigger: {
        label: "Add variant",
      },
      clear: "Clear",
    },
  }
}
