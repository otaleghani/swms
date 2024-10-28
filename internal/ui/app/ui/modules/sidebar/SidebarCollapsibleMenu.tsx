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
import { DictSidebarMenuItem } from "@/app/lib/types/dictionary/sidebar";

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
  items: DictSidebarMenuItem[];
};

export default function SidebarCollapsibleMenu({
  triggerLabel,
  items,
}: Props) {
  return (
    <Collapsible defaultOpen={false} className="group/collapsible">
      <SidebarMenuButton asChild>
        <CollapsibleTrigger>
          {triggerLabel}
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
      </SidebarMenuButton>

      <CollapsibleContent>
        <SidebarMenuSub>
          {items.map((item) => (
            <SidebarMenuSubItem>
              <SidebarMenuSubButton asChild>
                <Link href={item.url}>
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  )
}
