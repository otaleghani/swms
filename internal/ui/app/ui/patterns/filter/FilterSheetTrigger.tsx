import { DictFilters } from "@/app/lib/types/dictionary/misc";
import { SheetTrigger, SheetHeader, SheetTitle } from "../../components/sheet";
import { Button } from "../../components/button";
import { ListFilter } from "lucide-react";
import { useActiveFilters } from "./hooks/useActiveFilters";

interface Props {
  dict: DictFilters;
}

const FilterSheetTrigger = ({
  dict,
  params
}: Props & { params?: any }) => {

  const activeFilters = params ? useActiveFilters(params.filters) : 0;
  return (
    <>
      <SheetTrigger asChild className="h-8">
        <Button 
          variant="outline"
          className={`${activeFilters != 0 && "bg-yellow-100"}`}
        >
          <ListFilter className="w-4 h-4 mr-2" />
            {activeFilters != 0 && `${activeFilters} `}
            {activeFilters == 0 && dict.trigger.empty}
            {activeFilters == 1 && dict.trigger.singular}
            {activeFilters > 1 && dict.trigger.plural}
        </Button>
      </SheetTrigger>
    </>
  )
}

const FilterSheetHeader = ({
  dict
}: Props) => {
  return (
    <SheetHeader className="mb-4">
      <SheetTitle className="font-semibold text-xl">
        {dict.title}
      </SheetTitle>
    </SheetHeader>
  )
}

export { FilterSheetHeader, FilterSheetTrigger }
