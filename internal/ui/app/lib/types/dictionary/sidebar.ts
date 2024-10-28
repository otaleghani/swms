export type DictSidebar = {
  header: DictSidebarHeader;
  footer: DictSidebarFooter;
  content: DictSidebarContent;
}

export type DictSidebarHeader = {
  title: string;
  subtitle: string;
}

export type DictSidebarFooter = {
  dropdown: {
    accountPage: string;
    githubStar: string;
    logIn: string;
    logOut: string;
  }
}

/** Contains all the different sections */
export type DictSidebarContent = {
  inventory: DictSidebarContentInventory;
}

export type PositionSubmenu = "zone" | "aisle" | "rack" | "shelf";
export type CategorySubmenu = "category" | "subcategory"

export type DictSidebarContentInventory = {
  title: string;
  menu: {
    item: DictSidebarMenuItem;
    supplier: DictSidebarMenuItem;
    position: DictSidebarSubmenu<PositionSubmenu>;
    category: DictSidebarSubmenu<CategorySubmenu>
  }
}

export type TicketSettingSubmenu = "type" | "state";

export type DictSidebarContentTickets = {
  title: string;
  menu: {
    ticket: DictSidebarMenuItem;
    product: DictSidebarMenuItem;
    setting: DictSidebarSubmenu<TicketSettingSubmenu>
  }
}

export type DictSidebarSubmenu<SubmenuList extends string> = {
  title: string;
  submenu: {
    [K in SubmenuList]: DictSidebarMenuItem;
  }
}

export interface DictSidebarMenuItem {
  label: string;
  url: string;
  action?: {
    srLabel: string;
    url: string;
  };
};
