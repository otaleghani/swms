import { DictZone } from "@/app/lib/types/dictionary/data/zone";

export const dictionaryZones: DictZone = {
  header: {
    title: "Zones",
    breadcrumbs: {
      home: "Home",
      zone: "Zone",
    },
  },
  card: {
    labels: {
      aisles: "Aisles",
      items: "Items",
    },
  },
  dialogs: {
    add: {
      title: "New zone",
      description: "Add a new zone with this form.",
      trigger: {
        label: "Add zone",
      },
      clear: "Clear",
    },
    addBulk: {
      title: "Add new zones in bulk",
      description: "Create an x amount of zones",
      trigger: {
        label: "Add zones",
      },
      clear: "Clear",
    },
    replace: {
      title: "Replace this zone",
      description: "Delete this zone and assign it's items to another.",
      trigger: {
        label: "Replace zone",
      },
      clear: "Clear",
    },
    edit: {
      title: "Edit zone",
      description: "Edit this zone with new data",
      trigger: {
        label: "Edit zone",
      },
      clear: "Clear",
    },
  }
}
