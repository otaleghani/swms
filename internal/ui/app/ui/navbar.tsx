'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/app/ui/components/button"
import { Mail, House, Warehouse, Tag, CircleUserRound, CirclePlus, UserCircle } from "lucide-react"
import { usePathname } from "next/navigation";
import { ModeToggle } from "./toggle_mode";

export default function Navbar() {
  const pathname = usePathname();
  let pathnameNoLocale: string = pathname.slice(4);

  return (
    <nav className="bg-background xl:w-auto w-dvw fixed py-2 flex xl:flex-col xl:top-0 bottom-0 left-0 right-0 xl:right-auto justify-between xl:justify-start xl:gap-1 xl:border-r xl:border-t-0 border-t z-10">
      <div className="pb-0 mb-0 xl:pb-2 xl:mb-1 border-b-0 xl:border-b">
        <Button 
          key="Home"
          asChild 
          variant={"/" === "/" + pathnameNoLocale 
          ? "default" : "outline"} 
          className=""
          size="icon">
          <Link href="/" className="mx-2">
            <House className="h-[1.2rem] w-[1.2rem]"/>
          </Link>
        </Button>
      </div>
      {links.map((item) => (
        <Button 
          key={item.tooltip}
          asChild 
          variant={item.href === "/" + pathnameNoLocale 
          ? "default" : "ghost"} 
          size="icon"
          >
          <Link href={item.href} className="mx-2">
            {item.icon}
          </Link>
        </Button>
      ))}
      <div className="mt-auto xl:pt-2 border-t-0 xl:border-t">
        <Button 
          key="Account"
          asChild 
          variant={"/" === "/" + pathnameNoLocale 
          ? "default" : "ghost"} 
          className=""
          size="icon">
          <Link href="/account" className="mx-2">
            <CircleUserRound className="h-[1.2rem] w-[1.2rem]"/>
          </Link>
        </Button>
      </div>
    </nav>
  )
}

const links = [
  {
    tooltip: "Items",
    href: "/items",
    icon: <Warehouse className="h-[1.2rem] w-[1.2rem]"/>,
  },
  {
    tooltip: "Add new item",
    href: "/items/add",
    icon: <CirclePlus className="h-[1.2rem] w-[1.2rem]"/>,
  },
  {
    tooltip: "Tickets",
    href: "/tickets",
    icon: <Tag className="h-[1.2rem] w-[1.2rem]"/>,
  },
];
