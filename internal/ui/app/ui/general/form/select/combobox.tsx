// The combo takes an array of objects
// { 
//    id: string;
//    name: string;
// }

"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover"
import { CommandList } from "cmdk"

interface ComboboxSelectProps {
  list: any;
  element: any;
  setElement: any;
}

export function ComboboxSelect({ list, element, setElement }: ComboboxSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {element
              ? list.find((item: any) => item.id === element)?.id
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandList>
            <CommandGroup>
              {list.map((item: any) => (
                <CommandItem
                  key={item.id}
                  value={item.id}
                  onSelect={(currentValue) => {
                    setElement(currentValue === element ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      element === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.id}
                </CommandItem>
              ))}
            </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
