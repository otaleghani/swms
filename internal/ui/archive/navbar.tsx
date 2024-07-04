'use client';
import { Button } from "@/components/button"
import Link from "next/link"
import { House, Warehouse, Tag, Building2, Settings, CircleUserRound } from "lucide-react"
import { ModeToggle } from "@/app/[lang]/ui/toggle_mode";
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip"
import Image from "next/image";

const links = [
  {
    tooltip: "",
    href: "/",
    icon: <House className="h-[1.2rem] w-[1.2rem]"/>,
  },
  {
    tooltip: "",
    href: "/items",
    icon: <Warehouse className="h-[1.2rem] w-[1.2rem]"/>,
  },
  {
    tooltip: "",
    href: "/tickets",
    icon: <Tag className="h-[1.2rem] w-[1.2rem]"/>,
  },
  {
    tooltip: "",
    href: "/account",
    icon: <CircleUserRound className="h-[1.2rem] w-[1.2rem]"/>,
  },
  // {
  //   tooltip: "",
  //   href: "/organization",
  //   icon: <Building2 className="h-[1.2rem] w-[1.2rem]"/>,
  // },
  // {
  //   tooltip: "",
  //   href: "/settings",
  //   icon: <Settings className="h-[1.2rem] w-[1.2rem]"/>,
  // },
]

interface NavbarProps {
  linksTooltip: string[];
}

export default function Navbar({ linksTooltip }: NavbarProps) {
  const pathname = usePathname();
  for (let i = 0; i < links.length; i++) {
    links[i].tooltip = linksTooltip[i]
  }

//<Image 
//  src="/assets/vercel.svg"
//  alt=""
//  width={50}
//  height={50}
//  className="h-[1.2rem] w-[1.2rem]"
///>

  let pathnameNoLocale: string = pathname.slice(4);
  return (
    <TooltipProvider>
      <nav className="px-4 fixed bottom-0 left-0 right-0 flex border-r items-center gap-1 justify-between">
        {links.map((item) => (
          <div className="grid justify-items-center">
          <Button 
            key={item.tooltip}
            asChild 
            variant={item.href === "/" + pathnameNoLocale 
            ? "default" : "ghost"} 
            size="icon">
            <Link href={item.href}>
              {item.icon}
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">{item.tooltip}</p>
          </div>
        ))}
        {/*
        <div className="!justify-self-end">
          <ModeToggle />
        </div>
        */}
      </nav>
    </TooltipProvider>
  )
}
