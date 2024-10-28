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

export type DictSidebarContent = {


  position: DictSidebarContentPositions;
}

export type DictSidebarContentPositions = {
  title: string;
  menuItems: {
    zone: DictSidebarMenuItem;
    aisle: DictSidebarMenuItem;
    rack: DictSidebarMenuItem;
    shelf: DictSidebarMenuItem;
  }
}

interface DictSidebarMenuItem {
  label: string;
  url: string;
  action?: {
    srLabel: string;
    url: string;
  };
};
