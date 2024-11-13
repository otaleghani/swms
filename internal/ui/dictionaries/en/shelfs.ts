import { DictShelf } from "@/app/lib/types/dictionary/data/shelf";

export const dictionaryShelfs: DictShelf = {
  header: {
    title: "Shelfs",
    breadcrumbs: {
      home: "Home",
      zone: "Zones",
      aisle: "Aisles",
      rack: "Racks",
      shelf: "Shelfs",
    },
  },
  card: {
    labels: {
      zone: "Zone",
      aisle: "Aisle",
      rack: "Rack",
      items: "Items",
    },
  },
  dialogs: {
    add: {
      title: "New shelf",
      description: "Add a new shelf with this form.",
      trigger: {
        label: "Add shelf",
      },
      clear: "Clear",
    },
    addBulk: {
      title: "Add new shelfs in bulk",
      description: "Create an x amount of shelfs",
      trigger: {
        label: "Add shelf",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace this shelf",
      description: "Delete this shelf and assign it's items to another.",
      trigger: {
        label: "Replace shelf",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit shelf",
      description: "Edit this shelf with new data",
      trigger: {
        label: "Edit shelf",
      },
      clear: "Clear",
    },
  },
  
}
