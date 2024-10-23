import { DictFilters } from "@/app/lib/types/dictionary/misc";
import { SheetTrigger, SheetHeader, SheetTitle } from "../../components/sheet";
import { Button } from "../../components/button";
import { ListFilter } from "lucide-react";

interface Props {
  dict: DictFilters;
}

const FilterSheetTrigger = ({dict}: Props) => {
  return (
    <>
      <SheetTrigger asChild className="h-8">
        <Button variant="outline">
          <ListFilter className="w-4 h-4 mr-2" />
          {dict.trigger}
        </Button>
      </SheetTrigger>
    </>
  )
}

const FilterSheetHeader = ({dict}: Props) => {
  return (
    <SheetHeader className="mb-4">
      <SheetTitle className="font-semibold text-xl">
        {dict.title}
      </SheetTitle>
    </SheetHeader>
  )
}

export { FilterSheetHeader, FilterSheetTrigger }
