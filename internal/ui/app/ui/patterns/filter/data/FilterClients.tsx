"use client";

// Dictionaries
import { DictCheckboxField, DictInputField, DictSelectField } from "@/app/lib/types/dictionary/form";
import { DictFilters } from "@/app/lib/types/dictionary/misc";

// Components
import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import { FilterSheetTrigger, FilterSheetHeader } from "../FilterSheetTrigger";

// Next components
import Link from "next/link";

// Filters
import { useFilterParams } from "../hooks/useFilter";
import { useFilterSearch } from "../hooks/useFilterSearch";
import { useFilterIsBusiness } from "../hooks/useFilterIsBusiness";
import { Checkbox } from "@/app/ui/components/checkbox";
import { ChangeEvent, FormEventHandler } from "react";
import { is } from "date-fns/locale";
import { CheckedState } from "@radix-ui/react-checkbox";

interface Props {
  fields: {
    search: {
      dict: DictInputField;
    };
    isBusiness: {
      dict: DictCheckboxField;
    };
  };
  dict: DictFilters;
};


const SheetPatternBody = ({fields, dict}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "zones", setParams);

  const { isBusiness, setIsBusiness, handleIsBusiness } =
    useFilterIsBusiness(params, "clients", setParams)

  return (
    <>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        <div>
          <Label>{fields.search.dict.label}</Label>
          <Input 
            type="text"
            placeholder="Your search.."
            onChange={handleInput}
            value={searchTerm}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isBusiness"
            checked={isBusiness as CheckedState} 
            onCheckedChange={handleIsBusiness} 
          />
          <Label htmlFor="isBusiness">{fields.isBusiness.dict.label}</Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Button asChild> 
          <a href={link}>{dict.button}</a>
        </Button>
        <Button variant="secondary" onClick={() => {
          setIsBusiness(false);
          setSearchTerm("");
        }}> 
        {dict.reset}
        </Button>
      </div>
    </>
  )
}

export default function FilterClients({
  fields,
  dict,
}: Props) {
  const { params, setParams, link } = useFilterParams();

  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} params={params.clients}/>)
  }
  const SheetBody = () => {
    return (<SheetPatternBody fields={fields} dict={dict}/>)
  }
  return (
    <>
      <SheetWrapper
        Trigger={SheetHead}
        Body={SheetBody}
      />
    </>
  )
}
