import { DictAisle } from "@/app/lib/types/dictionary/data/aisle";

export const dictionaryAisles: DictAisle = {
  header: {
    title: "Aisles",
    breadcrumbs: {
      home: "Home",
      zone: "Zones",
      aisle: "Aisles",
    },
  },
  card: {
    labels: {
      zone: "Zone",
      racks: "Aisles",
      items: "Items",
    },
  },
  dialogs: {
    add: {
      title: "New aisle",
      description: "Add a new aisle with this form.",
      trigger: {
        label: "Add aisle",
      },
      clear: "Clear",
    },
    addBulk: {
      title: "Add new aisles in bulk",
      description: "Create an x amount of aisles",
      trigger: {
        label: "Add aisle",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace this aisle",
      description: "Delete this aisle and assign it's items to another.",
      trigger: {
        label: "Replace aisle",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit aisle",
      description: "Edit this aisle with new data",
      trigger: {
        label: "Edit aisle",
      },
      clear: "Clear",
    },
  }
  
}
