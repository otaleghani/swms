export interface DictZone {
  headers: {},
  card: {},
  dialogs: {}
}

export interface DictZoneDialogs {
  add: DictZoneDialog;
  addBulk: DictZoneDialog;
  delete: DictZoneDialog;
  edit: DictZoneDialog;
}

export interface DictZoneDialog {
  title: string;
  description: string;
  trigger: {
    label: string;
  };
};

type DictZoneBreadcrumbsList = "home" | "zone" | "aisle" | "rack";
export type DictZoneBreadcrumbs = {
  [K in DictZoneBreadcrumbsList]: string;
}

    "header_single": {
      "title": "Zone",
      "breadcrumbs": {
        "home": "Home",
        "zone": "Zone",
        "aisle": "Corridoio",
        "rack": "Scaffale"
      }
    },

    "header_collection": {
      "title": "Zone"
    },

    "card": {
      "labels": {
        "aisles": "Corridoi",
        "items": "Oggetti",
        "edit": "Modifica",
        "view": "Guarda"
      }
    },

