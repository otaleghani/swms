import { TicketStates, TicketState } from "@/app/lib/types/data/tickets";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "tickets"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterTicketStates = (
  params: SearchParams,
  ticketStates: TicketStates,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [ticketState, setTicketState] = useState(
    params[type]?.filters?.ticketState
    ? ticketStates.find(
      (item) => item.id == params[type]?.filters?.ticketState) 
        || {id: "", name: ""} as TicketState
    : {id: "", name: ""} as TicketState
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { ticketState: zone.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [ticketState]);

  return { ticketState, setTicketState };
};
