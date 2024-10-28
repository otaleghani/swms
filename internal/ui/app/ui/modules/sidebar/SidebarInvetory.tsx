import { DictSidebarContentInventory } from "@/app/lib/types/dictionary/sidebar";
import { 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from "../../components/sidebar";
import SidebarCollapsibleMenu from "./SidebarCollapsibleMenu";
import SidebarMenuItemWithAction from "./SidebarMenuItemWithAction";

export default function SidebarInventory({
  title,
  menu
}: DictSidebarContentInventory) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItemWithAction {...menu.item} />
          <SidebarMenuItemWithAction {...menu.supplier} />
          <SidebarCollapsibleMenu 
            triggerLabel={menu.position.title}
            items={[
              {...menu.position.submenu.zone},
              {...menu.position.submenu.aisle},
              {...menu.position.submenu.rack},
              {...menu.position.submenu.shelf},
            ]}
          />
          <SidebarCollapsibleMenu 
            triggerLabel={menu.category.title}
            items={[
              {...menu.category.submenu.category},
              {...menu.category.submenu.subcategory},
            ]}
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
