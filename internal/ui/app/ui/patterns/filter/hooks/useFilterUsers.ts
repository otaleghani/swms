import { Users, User } from "@/app/lib/types/data/users";
import { SearchParams } from "@/app/lib/types/pageParams";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { deepMerge } from "@/app/lib/searchParams";

type PossibleParams = keyof Pick<SearchParams, 
  "transactions"
>;

/** Manages the creation of a compatible URL for filtering data. */
export const useFilterUsers = (
  params: SearchParams,
  users: Users,
  type: PossibleParams,
  setParams: Dispatch<SetStateAction<SearchParams>>,
) => {
  const [user, setUser] = useState(
    params[type]?.filters?.user
    ? users.find(
      (item) => item.id == params[type]?.filters?.user) 
        || {id: "", name: ""} as User
    : {id: "", name: ""} as User
  );

  useEffect(() => {
    let diff: SearchParams = {};
    diff[type] = { ...{ filters: { user: user.id }}};
    const newParams = deepMerge({...params}, diff);
    setParams(newParams);
  }, [user]);

  return { user, setUser };
};
