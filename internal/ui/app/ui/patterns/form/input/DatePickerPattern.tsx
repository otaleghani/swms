"use client"

/** React hooks */
import { useState, useEffect } from "react"

/** Actions and utils */
import { format, Locale, toDate } from "date-fns"
import { cn } from "@/lib/utils"
import { it, enUS } from "date-fns/locale"

/** Third party components */
import { Calendar as CalendarIcon } from "lucide-react"

/** Local components */
import { Button } from "@/app/ui/components/button"
import { Calendar } from "@/app/ui/components/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/ui/components/popover"
import FormFieldErrorsPattern from "../FormFieldErrorsPattern"

/** Types and interfaces */
import { DictDatePickerField } from "@/app/lib/types/dictionary/form"
import { AcceptedLocales } from "@/app/lib/types/misc"

interface DatePickerPatternProps {
  field: 
    "openDate" |
    "closeDate";
  dict: DictDatePickerField;
  locale: AcceptedLocales;
  defaultValue?: string;
  errorMessages: string[];
}

export function DatePickerPattern({
  field,
  dict,
  locale,
  defaultValue,
  errorMessages
}: DatePickerPatternProps) {
  let inputId = "";
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    inputId = `${Math.random().toString(36).substring(2, 9)}`;
    if (defaultValue) {
      const defaultDate = new Date(defaultValue);
      setDate(defaultDate);
    }
  }, []);


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
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date 
              ? format(date, "PPP", { locale: dateLocale }) 
              : <span>{dict.placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={dateLocale}
          />
        </PopoverContent>
      </Popover>
      <input type="hidden" value={date?.toISOString()} name={field} />
      <FormFieldErrorsPattern 
        errorMessages={errorMessages}
        id={`${field}-${inputId}-errors`}
      />
    </>
  )
}

