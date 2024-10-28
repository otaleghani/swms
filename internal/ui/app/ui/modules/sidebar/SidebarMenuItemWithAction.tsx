import { DictSidebarMenuItem } from "@/app/lib/types/dictionary/sidebar";
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "../../components/sidebar";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function SidebarMenuItemWithAction({
  label,
  url,
  action
}: DictSidebarMenuItem) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild> 
        <Link href={url}>{label}</Link>
      </SidebarMenuButton>
      {action && (
        <SidebarMenuAction asChild>
          <Link href={action.url}>
            <Plus className="mr-auto"/> <span className="sr-only">Add Project</span>
          </Link>
        </SidebarMenuAction>
      )}
    </SidebarMenuItem>
  )
}
