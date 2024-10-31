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
import { 
  SelectableItem, 
  SelectFieldPatternProps 
} from "@/app/lib/types/form/fields";

export function SelectFieldPatternCombobox<T extends SelectableItem>({
  name,
  list, 
  element, 
  setElement, 
  dict,
}: SelectFieldPatternProps<T>) {
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
              ? list.find((item: any) => (item.name + item.id) === (element.name as string + element.id))?.name
              : dict.select.combobox.select }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder={dict.select.combobox.search} />
            <CommandEmpty>{dict.select.combobox.empty}</CommandEmpty>
            <CommandList>
            <CommandGroup>
              {list.map((item: any) => (
                <CommandItem
                  key={item.id}
                  value={item.name + item.id}
                  onSelect={(currentValue) => {
                    setElement(currentValue === element.name as string + element.id
                    ? { id: "", name: "" } as any
                    : {
                        id: 
                          list.find(
                            (item: any) => item.name + item.id === currentValue
                        )?.id, 
                        name: 
                          list.find(
                            (item: any) => item.name + item.id === currentValue
                        )?.name,
                    } as any)
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
