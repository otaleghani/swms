'use client';

import { Button } from "@/components/button"
import { Mail } from "lucide-react"

export default function TestButtons() {
  return (
    <nav className="fixed flex xl:flex-col xl:top-0 bottom-0 left-0 right-0 xl:right-auto justify-between xl:justify-start xl:gap-1">
      <Button><Mail className="h-4 w-4"/></Button>
      <Button><Mail className="h-4 w-4"/></Button>
      <Button><Mail className="h-4 w-4"/></Button>
      <Button><Mail className="h-4 w-4"/></Button>
    </nav>
  )
}
