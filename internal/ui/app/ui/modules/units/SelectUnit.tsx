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
import { Dispatch, SetStateAction } from "react";

/** Local components */
import { Label } from "@/app/ui/components/label";
//import { SelectFieldPatternCombobox } from "./SelectFieldPatternCombobox";

/** Types and interfaces */
//import FormFieldErrorsPattern from "../FormFieldErrorsPattern";
import { 
  SelectFieldPatternProps, 
  SelectableItem 
} from "@/app/lib/types/form/fields";
import { Unit } from "@/app/lib/types/data/units";


interface Props {
  field: "weight" | "height" | "lenght" | "width";
  list: Unit[];
  element: Unit;
  setElement: Dispatch<SetStateAction<Unit>>;
  dict: any;
}

export default function SelectUnit({
  field,
  list, 
  element, 
  setElement, 
  dict
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <input 
        suppressHydrationWarning
        required
        type="hidden" 
        id={`unit-${field}`}
        name={`unit-${field}`}
        value={element.id} 
      />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10"
          >
            {element.id != ''
              ? list.find((item: any) => (item.id + item.id) === (element.id as string + element.id))?.id
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
                  value={item.id + item.id}
                  onSelect={(currentValue) => {
                    setElement(currentValue === element.id as string + element.id
                    ? { id: "" } as any
                    : {
                      ...list.find(
                        (item: any) => item.id + item.id === currentValue),
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

    </div>
  );
};
