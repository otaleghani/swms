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
  dict: {
    select: string;
    search: string;
    empty: string;
  }
}

export function ComboboxSelect({ list, element, setElement, dict }: ComboboxSelectProps) {
  const [open, setOpen] = React.useState(false)
  console.log("ComboboxSelect: ", element)

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {element.name != '' 
              ? list.find((item: any) => item.name === element.name)?.name
              : dict.select }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] h-[--radix-popover-content-available-height] p-0">
          <Command>
            <CommandInput placeholder={dict.search} />
            <CommandEmpty>{dict.empty}</CommandEmpty>
            <CommandList>
            <CommandGroup>
              {list.map((item: any) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setElement(currentValue === element.name 
                    ? {id: "", name: ""} 
                    : {
                        id: list.find((item: any) => item.name === currentValue)?.id, 
                        name: currentValue
                    })
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      element.id === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
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
