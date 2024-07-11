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
import { RefreshData } from "@/lib/actions"

interface VariantPickerProps {
  data: any;
  valueSetter: React.Dispatch<React.SetStateAction<any>>;
}

export function VariantPicker({ data, valueSetter }: VariantPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? data.find((single: any) => single.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command label="command menu">
          <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {data.map((single: any) => (
              <CommandItem
                key={single.value}
                value={single.value}
                onSelect={(currentValue) => {
                  RefreshData(currentValue)
                  setValue(currentValue === value ? "" : currentValue);
                  valueSetter(single);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === single.value ? "opacity-100" : "opacity-0"
                  )}
                />
                  {single.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

