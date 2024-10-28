import { DictSidebar } from "@/app/lib/types/dictionary/sidebar";

export const dictionarySidebar: DictSidebar = {
  header: {
    title: "title",
    subtitle: "description",
  },

  footer: {
    dropdown: {
      logIn: "Log in",
      logOut: "Log out",
      accountPage: "Accout",
      githubStar: "Give us a star on GitHub!",
    }
  },

  content: {
    position: {
      title: "Locations",
      menuItems: {
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
      }
    }
  }
}
