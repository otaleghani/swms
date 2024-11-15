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
import { Items } from "@/app/lib/types/data/items";
import { Variants } from "@/app/lib/types/data/variants";
import { useFilterItems } from "../hooks/useFilterItems";
import { useFilterVariants } from "../hooks/useFilterVariants";

interface Props {
  fields: {
    suppliers: {
      list: Suppliers;
      dict: DictSelectField;
    };
    items: {
      list: Items;
      dict: DictSelectField;
    };
    variants: {
      list: Variants;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
  };
  hide: {
    supplier?: boolean;
    item?: boolean;
    variant?: boolean;
    search?: boolean;
  }
  dict: DictFilters;
};

const SheetPatternBody = ({fields, dict, hide}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { supplier, setSupplier } = 
    useFilterSuppliers(params, fields.suppliers.list, "supplierCodes", setParams);

  const { item, setItem } = 
    useFilterItems(params, fields.items.list, "supplierCodes", setParams);

  const { variant, setVariant } = 
    useFilterVariants(params, fields.variants.list, "supplierCodes", setParams);

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "supplierCodes", setParams);

  return (
    <>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        {!hide.supplier && (
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
        )}

        {!hide.item && (
          <div>
            <Label>{fields.items.dict.select.label}</Label>
            <ForeignKeyFilter<"Item"> 
              name="Item"
              list={fields.items.list}
              dict={fields.items.dict}
              element={item}
              setElement={setItem}
            />
          </div> 
        )}

        {!hide.variant && (
          <div>
            <Label>{fields.variants.dict.select.label}</Label>
            <ForeignKeyFilter<"Variant"> 
              name="Variant"
              list={fields.variants.list}
              dict={fields.variants.dict}
              element={variant}
              setElement={setVariant}
            />
          </div> 
        )}

        {!hide.search && (
          <div>
            <Label>{fields.search.dict.label}</Label>
            <Input 
              type="text"
              placeholder="Your search.."
              onChange={handleInput}
              value={searchTerm}
            />
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button asChild> 
          <a href={link}>{dict.button}</a>
        </Button>
        <Button variant="secondary" onClick={() => {
          setSupplier({id: "", name: ""});
          setSearchTerm("");
        }}> 
        {dict.reset}
        </Button>
      </div>
    </>
  )
}

export default function FilterSuppliers({
  fields,
  dict,
  hide
}: Props) {
  const { params, setParams, link } = useFilterParams();

  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} params={params.supplierCodes} />)
  }
  const SheetBody = () => {
    return (<SheetPatternBody fields={fields} dict={dict} hide={hide}/>)
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
