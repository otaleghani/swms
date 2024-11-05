"use client";

// Types and interfaces
import { Products, Product } from "@/app/lib/types/data/products";
import { TicketTypes, TicketType } from "@/app/lib/types/data/tickets";
import { TicketStates, TicketState } from "@/app/lib/types/data/tickets";
import { Clients, Client } from "@/app/lib/types/data/clients";

// Dictionaries
import { DictDatePickerField, DictInputField, DictSelectField } from "@/app/lib/types/dictionary/form";
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
import { useFilterOpen } from "../hooks/useFilterOpen";
import { useFilterClose } from "../hooks/useFilterClose";
import { useFilterClients } from "../hooks/useFilterClients";
import { useFilterProducts } from "../hooks/useFilterProducts";
import { useFilterTicketTypes } from "../hooks/useFilterTypes";
import { useFilterTicketStates } from "../hooks/useFilterStates";
import { DateRangePickerPattern } from "../../form/input/DateRangePickerPattern";
import { AcceptedLocales } from "@/app/lib/types/misc";

interface Props {
  locale: AcceptedLocales;
  fields: {
    open: {
      dict: DictDatePickerField;
    };
    close: {
      dict: DictDatePickerField;
    };
    clients: {
      list: Clients;
      dict: DictSelectField;
    };
    products: {
      list: Products;
      dict: DictSelectField;
    };
    ticketTypes: {
      list: TicketTypes;
      dict: DictSelectField;
    };
    ticketStates: {
      list: TicketStates;
      dict: DictSelectField;
    };
    search: {
      dict: DictInputField;
    };
  };
  dict: DictFilters;
};

const SheetPatternBody = ({fields, dict, locale}: Props) => {
  const { params, setParams, link } = useFilterParams();

  const { client, setClient } = 
    useFilterClients(params, fields.clients.list, "tickets", setParams);
  const { product, setProduct } = 
    useFilterProducts(params, fields.products.list, "tickets", setParams);
  const { ticketType, setTicketType } = 
    useFilterTicketTypes(params, fields.ticketTypes.list, "tickets", setParams);
  const { ticketState, setTicketState } = 
    useFilterTicketStates(params, fields.ticketStates.list, "tickets", setParams);
  const { open, setOpen } = 
    useFilterOpen(params, "tickets", setParams)
  const { close, setClose } = 
    useFilterClose(params, "tickets", setParams)

  const { searchTerm, setSearchTerm, handleInput } = 
    useFilterSearch(params, "tickets", setParams);

  return (
    <>
      <FilterSheetHeader dict={dict} />
      <div className="mb-4 grid gap-2">
        <div>
          <Label>{fields.clients.dict.select.label}</Label>
          <ForeignKeyFilter<"Client"> 
            name="Client"
            list={fields.clients.list}
            dict={fields.clients.dict}
            element={client}
            setElement={setClient}
          />
        </div> 
        <div>
          <Label>{fields.products.dict.select.label}</Label>
          <ForeignKeyFilter<"Product"> 
            name="Product"
            list={fields.products.list}
            dict={fields.products.dict}
            element={product}
            setElement={setProduct}
          />
        </div> 
        <div>
          <Label>{fields.ticketTypes.dict.select.label}</Label>
          <ForeignKeyFilter<"TicketType"> 
            name="TicketType"
            list={fields.ticketTypes.list}
            dict={fields.ticketTypes.dict}
            element={ticketType}
            setElement={setTicketType}
          />
        </div> 
        <div>
          <Label>{fields.ticketStates.dict.select.label}</Label>
          <ForeignKeyFilter<"TicketState"> 
            name="TicketState"
            list={fields.ticketStates.list}
            dict={fields.ticketStates.dict}
            element={ticketState}
            setElement={setTicketState}
          />
        </div> 
        <div>
          <Label>{fields.open.dict.label}</Label>
          <DateRangePickerPattern 
            date={open}
            setDate={setOpen}
            field="openDate"
            dict={fields.close.dict}
            locale={locale}
          />
        </div> 
        <div>
          <Label>{fields.close.dict.label}</Label>
          <DateRangePickerPattern 
            date={close}
            setDate={setClose}
            field="closeDate"
            dict={fields.close.dict}
            locale={locale}
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
          <a href={link}>{dict.button}</a>
        </Button>
        <Button variant="secondary" onClick={() => {
          setClient({id: "", name: ""} as Client);
          setProduct({id: "", name: ""} as Product);
          setTicketType({id: "", name: ""} as TicketType);
          setTicketState({id: "", name: ""} as TicketState);
          setOpen(undefined);
          setClose(undefined);
          setSearchTerm("");
        }}> 
        {dict.reset}
        </Button>
      </div>
    </>
  )
}

export default function FilterTickets({
  fields,
  dict,
  locale,
}: Props) {
  const { params, setParams, link } = useFilterParams();

  const SheetHead = () => {
    return (<FilterSheetTrigger dict={dict} params={params.tickets}/>)
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
  )
}
