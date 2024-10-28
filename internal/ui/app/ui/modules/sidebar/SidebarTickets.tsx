import { DictSidebarContentTickets } from "@/app/lib/types/dictionary/sidebar";
import { 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu
} from "../../components/sidebar";
import SidebarCollapsibleMenu from "./SidebarCollapsibleMenu";
import SidebarMenuItemWithAction from "./SidebarMenuItemWithAction";

export default function SidebarTicket({
  title,
  menu
}: DictSidebarContentTickets) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItemWithAction {...menu.ticket} />
          <SidebarMenuItemWithAction {...menu.product} />
          <SidebarCollapsibleMenu 
            triggerLabel={menu.setting.title}
            items={[
              {...menu.setting.submenu.type},
              {...menu.setting.submenu.state},
            ]}
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
