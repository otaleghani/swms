"use client"

import { format, Locale } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { it, enUS } from "date-fns/locale"
import { Button } from "@/app/ui/components/button"
import { Calendar } from "@/app/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/ui/components/popover"
import { Dispatch, SetStateAction } from "react"
import { AcceptedLocales } from "@/app/lib/types/misc"
import { DictDatePickerField } from "@/app/lib/types/dictionary/form"

interface Props {
  field: "openDate" | "closeDate";
  date: DateRange | undefined;
  setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  locale: AcceptedLocales;
  dict: DictDatePickerField;
}

export function DateRangePickerPattern({
  date,
  setDate,
  locale,
  field,
  dict
}: Props) {


  const dateLocale: Locale = (() => {
    switch (locale) {
      case "it":
        return it;
      case "en":
        return enUS;
      default:
        return enUS;
    }
  })();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon  className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "PPP", {locale: dateLocale})} -{" "}
                {format(date.to, "PPP", {locale: dateLocale})}
              </>
            ) : (
              format(date.from, "PPP", {locale: dateLocale})
            )
          ) : (
            <span>{dict.placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" >
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  )
}
