"use client"

/** React hooks */
import { useState } from "react";

/** Libraries components */
import { Check, ChevronsUpDown } from "lucide-react"
import { CommandList } from "cmdk"

/** Local components */
import { Button } from "@/app/ui/components/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/ui/components/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/ui/components/popover"

/** Scripts and utils */
import { cn } from "@/lib/utils"

/** Types and interfaces */
import { SelectableItem, SelectFieldPatternProps } from "./SelectPattern";

export function SelectPatternCombobox<Entity extends SelectableItem>({
  list, 
  element, 
  setElement, 
  dict 
}: SelectFieldPatternProps<Entity>) {
  const [open, setOpen] = useState(false);

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
              : dict.combobox.select }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder={dict.combobox.search} />
            <CommandEmpty>{dict.combobox.empty}</CommandEmpty>
            <CommandList>
            <CommandGroup>
              {list.map((item: Entity) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setElement(currentValue === element.name 
                    ? { id: "", name: "" } as Entity
                    : {
                        id: list.find((item: Entity) => item.name === currentValue)?.id, 
                        name: currentValue
                    } as Entity)
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
