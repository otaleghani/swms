import { DictSupplierCode } from "@/app/lib/types/dictionary/data/supplierCode";

export const dictionarySupplierCodes: DictSupplierCode = {
  dialogs: {
    add: {
      title: "Edit supplier code",
      description: "Edit this supplier code with new data",
      trigger: {
        label: "Edit supplier code",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace supplier code",
      description: "Delete this supplier code and assign it's items to another",
      trigger: {
        label: "Replace supplier code",
      },
      clear: "Clear",
    },
    delete: {
      title: "Delete supplier code",
      description: "Nukes this supplier code. All of the data associated with this would also be deleted. This operation is not reversable.",
      trigger: {
        label: "Delete supplier code",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit supplier code",
      description: "Edit this supplier code with new data",
      trigger: {
        label: "Edit supplier code",
      },
      clear: "Clear",
    },
  },
  
}
