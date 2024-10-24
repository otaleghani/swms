"use client";

// Types and interfaces
import { User, Users } from "@/app/lib/types/data/users";
import { Items, Item } from "@/app/lib/types/data/items";
import { Variants, Variant } from "@/app/lib/types/data/variants";
import { Tickets, Ticket } from "@/app/lib/types/data/tickets";

// Dictionaries
import { DictInputField, DictSelectField, DictDatePickerField } from "@/app/lib/types/dictionary/form";
import { DictFilters } from "@/app/lib/types/dictionary/misc";

// Components
import { Button } from "@/app/ui/components/button";
import { Input } from "@/app/ui/components/input";
import { Label } from "@/app/ui/components/label";
import SheetWrapper from "@/app/ui/wrappers/sheets/SheetWrapper";
import { FilterSheetTrigger, FilterSheetHeader } from "../FilterSheetTrigger";
import ForeignKeyFilter from "../ForeignKeyFilter";
import { DateRangePickerPattern } from "../../form/input/DateRangePickerPattern";

// Next components
import Link from "next/link";

// Filters
import { useFilterParams } from "../hooks/useFilter";
import { useFilterSearch } from "../hooks/useFilterSearch";
import { useFilterUsers } from "../hooks/useFilterUsers";
import { useFilterItems } from "../hooks/useFilterItems";
import { useFilterVariants } from "../hooks/useFilterVariants";
import { useFilterTickets } from "../hooks/useFilterTickets";
import { useFilterDate } from "../hooks/useFilterDate";
import { AcceptedLocales } from "@/app/lib/types/misc";

interface Props {
  locale: AcceptedLocales;
  fields: {
    users: {
      list: Users;
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
    tickets: {
      list: Tickets;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
    date: {
      dict: DictDatePickerField;
    };
  };
  dict: DictFilters;
};

const SheetPatternBody = ({locale, fields, dict}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "aisles", setParams);

  const { user, setUser } = 
    useFilterUsers(params, fields.users.list, "transactions", setParams);

  const { item, setItem } = 
    useFilterItems(params, fields.items.list, "transactions", setParams);

  const { variant, setVariant } = 
    useFilterVariants(params, fields.variants.list, "transactions", setParams);

  const { ticket, setTicket } = 
    useFilterTickets(params, fields.tickets.list, "transactions", setParams);

  const { date, setDate } = 
    useFilterDate(params, "transactions", setParams);

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
        <div>
          <Label>{fields.users.dict.select.label}</Label>
          <ForeignKeyFilter<"User"> 
            name="User"
            list={fields.users.list}
            dict={fields.users.dict}
            element={user}
            setElement={setUser}
          />
        </div> 
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
        <div>
          <Label>{fields.tickets.dict.select.label}</Label>
          <ForeignKeyFilter<"Ticket"> 
            name="Ticket"
            list={fields.tickets.list}
            dict={fields.tickets.dict}
            element={ticket}
            setElement={setTicket}
          />
        </div> 
        <div>
          <Label>{fields.date.dict.label}</Label>
          <DateRangePickerPattern 
            date={date}
            setDate={setDate}
            field="date"
            dict={fields.date.dict}
            locale={locale}
          />
        </div> 
      </div>

      <div className="flex gap-2">
        <Button asChild> 
          <Link href={link}>Filtra</Link>
        </Button>
        <Button variant="secondary" onClick={() => {
          setUser({id: "", name: ""} as User);
          setItem({id: "", name: ""} as Item);
          setVariant({id: "", name: ""} as Variant);
          setTicket({id: "", name: ""} as Ticket);
          setSearchTerm("");
        }}> 
          Reset
        </Button>
      </div>
    </>
  )
}

export default function FilterAisles({
  locale,
  fields,
  dict,
}: Props) {
  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} />)
  }
  const SheetBody = () => {
    return (<SheetPatternBody locale={locale} fields={fields} dict={dict}/>)
  }
  return (
    <>
      <SheetWrapper
        Trigger={SheetHead}
        Body={SheetBody}
      />
    </>
  );
};
