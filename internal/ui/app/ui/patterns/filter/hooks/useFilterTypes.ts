import { TicketTypes, TicketType } from "@/app/lib/types/data/tickets";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "tickets"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterTicketTypes = (
  params: SearchParams,
  ticketTypes: TicketTypes,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [ticketType, setTicketType] = useState(
    params[type]?.filters?.ticketType
    ? ticketTypes.find(
      (item) => item.id == params[type]?.filters?.ticketType) 
        || {id: "", name: ""} as TicketType
    : {id: "", name: ""} as TicketType
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { ticketType: ticketType.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [ticketType]);

  return { ticketType, setTicketType };
};
