import { Clients, Client } from "@/app/lib/types/data/clients";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "products" | 
  "tickets"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterClients = (
  params: SearchParams,
  clients: Clients,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [client, setClient] = useState(
    params[type]?.filters?.client
    ? clients.find(
      (item) => item.id == params[type]?.filters?.client) 
        || {id: "", name: ""} as Client
    : {id: "", name: ""} as Client
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { client: client.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [client]);

  return { client, setClient };
};
