"use client";

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

// Filters
import { useFilterParams } from "../hooks/useFilter";
import { useFilterSearch } from "../hooks/useFilterSearch";
import { emptyItem, Items } from "@/app/lib/types/data/items";
import { useFilterItems } from "../hooks/useFilterItems";

interface Props {
  fields: {
    items: {
      list: Items;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
  };
  dict: DictFilters;
  hide: {
    items?: boolean;
    search?: boolean;
  }
};

const SheetPatternBody = ({fields, dict, hide}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { item, setItem } = 
    useFilterItems(params, fields.items.list, "variants", setParams);

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "variants", setParams);

  return (
    <div>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        {!hide.items && (
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
          setItem(emptyItem);
          setSearchTerm("");
        }}> 
        {dict.reset}
        </Button>
      </div>
    </div>
  )
}

export default function FilterVariants({
  fields,
  dict,
  hide,
}: Props) {
  const { params, setParams, link } = useFilterParams();

  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} params={params.variants} />)
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
