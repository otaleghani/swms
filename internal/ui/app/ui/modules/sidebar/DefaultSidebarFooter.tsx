"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  Star,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/ui/components/sidebar"
import { DictSidebarFooter } from "@/app/lib/types/dictionary/sidebar"
import { User } from "@/app/lib/types/data/users"
import { ThemeToggle } from "../ThemeToggle"
import Link from "next/link"

interface Props {
  content: DictSidebarFooter;
  user: User;
}

export function DefaultSidebarFooter({
  content,
  user,
}: Props
) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
              {
                //<AvatarImage src={user.avatar} alt={user.name} />
              }
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name} {user.surname}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                {
                  //<AvatarImage src={user.avatar} alt={user.name} />
                }
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name} {user.surname}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />


            <DropdownMenuGroup>
              <Link href="/account">
                <DropdownMenuItem>
                    <BadgeCheck className="h-4 w-4 mr-2" />
                    {content.dropdown.accountPage}
                </DropdownMenuItem>
              </Link>

              <ThemeToggle 
                label={content.dropdown.theme.label}
                light={content.dropdown.theme.light}
                dark={content.dropdown.theme.dark}
                system={content.dropdown.theme.system}
              />
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="https://github.com/otaleghani" target="_blank">
                <DropdownMenuItem>
                  <Star className="h-4 w-4 mr-2" />
                  {content.dropdown.githubStar}
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>


            <DropdownMenuSeparator />

            <Link href="/logout">
              <DropdownMenuItem>
                <LogOut className="h-4 w-4 mr-2" />
                {content.dropdown.logOut}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}