"use client";

// Types and interfaces
import { Zones } from "@/app/lib/types/data/zones";

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
import { useFilterZones } from "../hooks/useFilterZones";
import { useFilterSearch } from "../hooks/useFilterSearch";

interface Props {
  fields: {
    zones: {
      list: Zones;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
  };
  dict: DictFilters;
  hide: {
    zones?: boolean;
    search?: boolean;
  }
};

const SheetPatternBody = ({fields, dict, hide}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { zone, setZone } = 
    useFilterZones(params, fields.zones.list, "aisles", setParams);

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "aisles", setParams);

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
          setSearchTerm("");
        }}> 
        {dict.reset}
        </Button>
      </div>
    </>
  )
}

export default function FilterAisles({
  fields,
  dict,
  hide,
}: Props) {
  const { params, setParams, link } = useFilterParams();

  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} params={params.aisles} />)
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
