import { Tickets, Ticket } from "@/app/lib/types/data/tickets";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "operations"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterTickets = (
  params: SearchParams,
  tickets: Tickets,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [ticket, setTicket] = useState(
    params[type]?.filters?.ticket
    ? tickets.find(
      (item) => item.id == params[type]?.filters?.ticket) 
        || {id: "", name: ""} as Ticket
    : {id: "", name: ""} as Ticket
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { ticket: ticket.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [ticket]);

  return { ticket, setTicket };
};
