import { CategorySubmenu, DictSidebar, DictSidebarContentInventory, DictSidebarContentTickets, DictSidebarFooter, DictSidebarHeader, DictSidebarMenuPosition, DictSidebarSubmenu, PositionSubmenu } from "@/app/lib/types/dictionary/sidebar";

const dictionarySidebarHeader: DictSidebarHeader = {
    title: "title",
    subtitle: "description",
}

const dictionarySidebarFooter: DictSidebarFooter = {
    dropdown: {
      logIn: "Log in",
      logOut: "Log out",
      accountPage: "Accout",
      githubStar: "Give us a star on GitHub!",
    }
}

const dictionarySidebarPosition: DictSidebarSubmenu<PositionSubmenu> = {
  title: "Locations",
  submenu: {
    zone: {
      label: "Zones",
      url: "/zones",
      action: {
        srLabel: "Add new zone",
        url: "/zones/add",
      }
    },
    aisle: {
      label: "Aisles",
      url: "/aisles",
      action: {
        srLabel: "Add new aisle",
        url: "/aisles/add",
      }
    },
    rack: {
      label: "Racks",
      url: "/racks",
      action: {
        srLabel: "Add new rack",
        url: "/racks/add",
      }
    },
    shelf: {
      label: "Shelfs",
      url: "/shelfs",
      action: {
        srLabel: "Add new shelf",
        url: "/shelfs/add",
      }
    },
  },
};

const dictionarySidebarCategory: DictSidebarSubmenu<CategorySubmenu> = {
  title: "Tags",
  submenu: {
    category: {
      label: "Categories",
      url: "/categories",
    },
    subcategory: {
      label: "Subcategories",
      url: "/subcategories",
    }
  }
}

const dictionarySidebarInventory: DictSidebarContentInventory = {
  title: "Inventory",
  menu: {
    item: {
      label: "Items",
      url: "/items",
      action: {
        srLabel: "Add new item",
        url: "/items/add"
      },
    },
    supplier: {
      label: "Suppliers",
      url: "/suppliers",
      action: {
        srLabel: "Add new supplier",
        url: "/suppliers/add"
      },
    },
    position: dictionarySidebarPosition,
    category: dictionarySidebarCategory,
  }
}

const dictionarySidebarTicket: DictSidebarContentTickets = {
  title: "Production",
  menu: {
    ticket: {
      label: "Tickets",
      url: "/tickets"
    },
    product: {
      label: "Products",
      url: "/products"
    },
    setting: {
      title: "Settings",
      submenu: {
        type: {
          label: "Types",
          url: "ticket-types",
        },
        state: {
          label: "States",
          url: "ticket-states",
        },
      }
    }
  }
}

export const dictionarySidebar: DictSidebar = {
  header: dictionarySidebarHeader,
  footer: dictionarySidebarFooter,
  content: {
    ticket: dictionarySidebarTicket,
    inventory: dictionarySidebarInventory,
  }
}
