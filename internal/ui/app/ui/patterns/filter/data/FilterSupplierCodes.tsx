"use client";

// Types and interfaces
import { Suppliers } from "@/app/lib/types/data/suppliers";

// Dictionaries
import { DictInputField, DictSelectField } from "@/app/lib/types/dictionary/form";
import { DictFilters } from "@/app/lib/types/dictionary/misc";

// Components
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { FilterSheetTrigger, FilterSheetHeader } from "../FilterSheetTrigger";
import ForeignKeyFilter from "../ForeignKeyFilter";

// Next components
import Link from "next/link";

// Filters
import { useFilterParams } from "../hooks/useFilter";
import { useFilterSearch } from "../hooks/useFilterSearch";
import { useFilterSuppliers } from "../hooks/useFilterSuppliers";

interface Props {
  fields: {
    suppliers: {
      list: Suppliers;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
  };
  dict: DictFilters;
};

const SheetPatternBody = ({fields, dict}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { supplier, setSupplier } = 
    useFilterSuppliers(params, fields.suppliers.list, "supplierCodes", setParams);

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "aisles", setParams);

  return (
    <>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        <div>
          <Label>{fields.suppliers.dict.select.label}</Label>
          <ForeignKeyFilter<"Supplier"> 
            name="Supplier"
            list={fields.suppliers.list}
            dict={fields.suppliers.dict}
            element={supplier}
            setElement={setSupplier}
          />
        </div> 
        <div>
          <Label>{fields.search.dict.label}</Label>
          <Input 
            type="text"
            placeholder="Your search.."
            onChange={handleInput}
            value={searchTerm}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button asChild> 
          <Link href={link}>Filtra</Link>
        </Button>
        <Button variant="secondary" onClick={() => {
          setSupplier({id: "", name: ""});
          setSearchTerm("");
        }}> 
          Reset
        </Button>
      </div>
    </>
  )
}

export default function FilterSuppliers({
  fields,
  dict,
}: Props) {
  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} />)
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
