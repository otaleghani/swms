import { 
  Sidebar, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "@/app/ui/components/sidebar"
import { Warehouse } from "lucide-react"
import { DefaultSidebarFooter } from "./DefaultSidebarFooter"
import { DictSidebar } from "@/app/lib/types/dictionary/sidebar"
import SidebarInventory from "./SidebarInvetory"
import SidebarTicket from "./SidebarTickets"
import Link from "next/link"
 
interface Props {
  dict: DictSidebar
}

export function DefaultSidebar({dict}: Props) {

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link className="block" href="/">
              <SidebarMenuButton size={"lg"}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Warehouse className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">
                    {dict.header.title}
                  </span>
                  <span className="">
                    {dict.header.subtitle}
                  </span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarInventory
          title={dict.content.inventory.title}
          menu={dict.content.inventory.menu}
        />
        <SidebarTicket 
          title={dict.content.ticket.title}
          menu={dict.content.ticket.menu}
        />

      </SidebarContent>

      <SidebarFooter>
        <DefaultSidebarFooter
          content={dict.footer}
          user={{
            email: "o.taleghani@gmail.com",
            name: "Oliviero",
            surname: "Taleghani",
            //avatar: ""
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
