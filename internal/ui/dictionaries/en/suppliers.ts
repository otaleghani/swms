import { DictSupplier } from "@/app/lib/types/dictionary/data/supplier";

export const dictionarySuppliers: DictSupplier = {
  header: {
    title: "Subcategories",
    breadcrumbs: {
      home: "Home",
      supplier: "Suppliers",
    }
  },
  dialogs: {
    add: {
      title: "Edit supplier",
      description: "Edit this supplier with new data",
      trigger: {
        label: "Edit supplier",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace supplier",
      description: "Delete this supplier and assign it's items to another",
      trigger: {
        label: "Replace supplier",
      },
      clear: "Clear",
    },
    delete: {
      title: "Delete supplier",
      description: "Nukes this supplier. All of the data associated with this would also be deleted. This operation is not reversable.",
      trigger: {
        label: "Delete supplier",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit supplier",
      description: "Edit this supplier with new data",
      trigger: {
        label: "Edit supplier",
      },
      clear: "Clear",
    },
  },
  card: {
    labels: {
      codes: "Codes",
    }
  }
  
}
