"use client";

import { 
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/app/ui/components/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../components/collapsible"
import { ChevronDown, Plus } from "lucide-react"
import Link from "next/link";

interface SidebarMenuItem {
  label: string;
  url: string;
  action?: {
    srLabel: string;
    url: string;
  };
};

interface Props {
  triggerLabel: string;
  menuItems: SidebarMenuItem[];
};

export default function DefaultSidebarCollapsibleGroup({
  triggerLabel, 
  menuItems
}: Props) {
  return (
      <SidebarGroup>
        <SidebarGroupLabel>
            {triggerLabel}
        </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>

            <Collapsible defaultOpen={false} className="group/collapsible">
              <SidebarMenuButton asChild>
                <CollapsibleTrigger>
                  {triggerLabel}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
            </SidebarMenuButton>
              <CollapsibleContent>
  <SidebarMenuSub>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton />
    </SidebarMenuSubItem>
    <SidebarMenuSubItem>
      <SidebarMenuSubButton />
    </SidebarMenuSubItem>
  </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
              {menuItems.map((item) => (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.action && (
                    <SidebarMenuAction asChild>
                      <Link href={item.action.url}>
                        <Plus /> <span className="sr-only">{item.action.srLabel}</span>
                      </Link>
                    </SidebarMenuAction>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

          </SidebarGroupContent>
      </SidebarGroup>
  )
}
