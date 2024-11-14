"use client";

// Types and interfaces
import { Categories } from "@/app/lib/types/data/categories";

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
import { useFilterCategories } from "../hooks/useFilterCategories";

interface Props {
  fields: {
    categories: {
      list: Categories;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
  };
  dict: DictFilters;
  hide: {
    category?: boolean;
    search?: boolean;
  }
};

const SheetPatternBody = ({fields, dict, hide}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { category, setCategory } = useFilterCategories(
    params, 
    fields.categories.list, 
    "subcategories", 
    setParams
  );

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "subcategories", setParams);

  return (
    <>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        {!hide.category && (
          <div>
            <Label>{fields.categories.dict.select.label}</Label>
            <ForeignKeyFilter<"Zone"> 
              name="Zone"
              list={fields.categories.list}
              dict={fields.categories.dict}
              element={category}
              setElement={setCategory}
            />
          </div> 
        )}
        {!hide.category && (
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
          setCategory({id: "", name: ""});
          setSearchTerm("");
        }}> 
        {dict.reset}
        </Button>
      </div>
    </>
  )
}

export default function FilterSubcategories({
  fields,
  dict,
  hide,
}: Props) {
  const { params, setParams, link } = useFilterParams();

  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} params={params.subcategories} />)
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
