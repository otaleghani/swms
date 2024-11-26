"use client";

// Types and interfaces
import { Zones } from "@/app/lib/types/data/zones";
import { Aisles, Aisle } from "@/app/lib/types/data/aisles";
import { Racks, Rack } from "@/app/lib/types/data/racks";
import { Shelfs, Shelf } from "@/app/lib/types/data/shelfs";
import { Categories, Category } from "@/app/lib/types/data/categories";
import { Subcategories, Subcategory } from "@/app/lib/types/data/subcategories";

// Dictionaries
import { DictCheckboxField, DictInputField, DictSelectField } from "@/app/lib/types/dictionary/form";
import { DictFilters } from "@/app/lib/types/dictionary/misc";

// Components
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import { Checkbox } from "@/app/ui/components/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { FilterSheetTrigger, FilterSheetHeader } from "../FilterSheetTrigger";
import ForeignKeyFilter from "../ForeignKeyFilter";
import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";

// Next components
import Link from "next/link";

// Filters
import { useFilterParams } from "../hooks/useFilter";
import { useFilterSearch } from "../hooks/useFilterSearch";
import { useFilterZones } from "../hooks/useFilterZones";
import { useFilterAisles } from "../hooks/useFilterAisles";
import { useFilterRacks } from "../hooks/useFilterRacks";
import { useFilterShelfs } from "../hooks/useFilterShelfs";
import { useFilterIsArchived } from "../hooks/useFilterIsArchived";
import { useFilterCategories } from "../hooks/useFilterCategories";
import { useFilterSubcategories } from "../hooks/useFilterSubcategories";

interface Props {
  fields: {
    zones: {
      list: Zones;
      dict: DictSelectField;
    };
    aisles: {
      list: Aisles;
      dict: DictSelectField;
    };
    racks: {
      list: Racks;
      dict: DictSelectField;
    };
    shelfs: {
      list: Shelfs;
      dict: DictSelectField;
    };
    categories: {
      list: Categories;
      dict: DictSelectField;
    };
    subcategories: {
      list: Subcategories;
      dict: DictSelectField;
    };
    isArchived: {
      dict: DictCheckboxField;
    };
    search: {
      dict: DictInputField;
    };
  };
  dict: DictFilters;
  hide: {
    zones?: boolean;
    aisles?: boolean;
    racks?: boolean;
    shelfs?: boolean;
    categories?: boolean;
    subcategories?: boolean;
    isArchived?: boolean;
    search?: boolean;
  }
};

const SheetPatternBody = ({fields, dict, hide}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { zone, setZone } = 
    useFilterZones(params, fields.zones.list, "items", setParams);

  const { aisle, setAisle } = 
    useFilterAisles(params, fields.aisles.list, "items", setParams);

  const { rack, setRack } = 
    useFilterRacks(params, fields.racks.list, "items", setParams);

  const { shelf, setShelf } = 
    useFilterShelfs(params, fields.shelfs.list, "items", setParams);

  const { category, setCategory } = 
    useFilterCategories(params, fields.categories.list, "items", setParams);

  const { subcategory, setSubcategory } = 
    useFilterSubcategories(params, fields.subcategories.list, "items", setParams);

  const { isArchived, setIsArchived, handleIsArchived } =
    useFilterIsArchived(params, "items", setParams)

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "items", setParams);

  return (
    <>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        {!hide.zones && (
          <div>
            <Label>{fields.zones.dict.select.label}</Label>
            <ForeignKeyFilter<"Zone"> 
              name="Zone"
              list={fields.zones.list}
              dict={fields.zones.dict}
              element={zone}
              setElement={setZone}
            />
          </div> 
        )}

        {!hide.aisles && (
          <div>
            <Label>{fields.aisles.dict.select.label}</Label>
            <ForeignKeyFilter<"Aisle"> 
              name="Aisle"
              list={fields.aisles.list}
              dict={fields.aisles.dict}
              element={aisle}
              setElement={setAisle}
            />
          </div> 
        )}

        {!hide.racks && (
          <div>
            <Label>{fields.racks.dict.select.label}</Label>
            <ForeignKeyFilter<"Rack"> 
              name="Rack"
              list={fields.racks.list}
              dict={fields.racks.dict}
              element={rack}
              setElement={setRack}
            />
          </div> 
        )}

        {!hide.shelfs && (
          <div>
            <Label>{fields.shelfs.dict.select.label}</Label>
            <ForeignKeyFilter<"Shelf"> 
              name="Shelf"
              list={fields.shelfs.list}
              dict={fields.shelfs.dict}
              element={shelf}
              setElement={setShelf}
            />
          </div> 
        )}

        {!hide.categories && (
          <div>
            <Label>{fields.categories.dict.select.label}</Label>
            <ForeignKeyFilter<"Category"> 
              name="Category"
              list={fields.categories.list}
              dict={fields.categories.dict}
              element={category}
              setElement={setCategory}
            />
          </div> 
        )}

        {!hide.categories && (
          <div>
            <Label>{fields.subcategories.dict.select.label}</Label>
            <ForeignKeyFilter<"Subcategory"> 
              name="Subcategory"
              list={fields.subcategories.list}
              dict={fields.subcategories.dict}
              element={subcategory}
              setElement={setSubcategory}
            />
          </div> 
        )}

        {!hide.isArchived && (
         <div className="flex items-center space-x-2">
           <Checkbox 
             id="isArchived"
             checked={isArchived as CheckedState} 
             onCheckedChange={handleIsArchived} 
           />
           <Label htmlFor="isArchived">{fields.isArchived.dict.label}</Label>
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
          setZone({id: "", name: ""});
          setAisle({id: "", name: ""} as Aisle);
          setRack({id: "", name: ""} as Rack);
          setShelf({id: "", name: ""} as Shelf);
          setCategory({id: "", name: ""} as Category);
          setSubcategory({id: "", name: ""} as Subcategory);
          setIsArchived(false);
          setSearchTerm("");
        }}> 
        {dict.reset}
        </Button>
      </div>
    </>
  )
}

export default function FilterItems({
  fields,
  dict,
  hide
}: Props) {
  const { params, setParams, link } = useFilterParams();

  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} params={params.items}/>)
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
