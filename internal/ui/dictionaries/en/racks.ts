import { DictRack } from "@/app/lib/types/dictionary/data/rack";


export const dictionaryRacks: DictRack = {
  header: {
    title: "Zones",
    breadcrumbs: {
      home: "Home",
      zone: "Zones",
      aisle: "Aisles",
      rack: "Racks",
    },
  },
  card: {
    labels: {
      zone: "Zone",
      aisle: "Aisle",
      shelfs: "Aisles",
      items: "Items",
    },
  },
  dialogs: {
    add: {
      title: "New rack",
      description: "Add a new rack with this form.",
      trigger: {
        label: "Add rack",
      },
      clear: "Clear",
    },
    addBulk: {
      title: "Add new racks in bulk",
      description: "Create an x amount of racks",
      trigger: {
        label: "Add rack",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace this rack",
      description: "Delete this rack and assign it's items to another.",
      trigger: {
        label: "Replace rack",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit rack",
      description: "Edit this rack with new data",
      trigger: {
        label: "Edit rack",
      },
      clear: "Clear",
    },
  }
  
}
