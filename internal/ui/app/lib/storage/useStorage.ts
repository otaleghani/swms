import { useEffect } from "react"
import { 
  getLocalStorage, 
  setLocalStorage, 
} from "./utils";
import { User } from "../types/data/users";
import { Unit } from "../types/data/units";
import { retrieve } from "../requests/generics/retrieve";
import { LOCAL_STORAGE_USER, LOCAL_STORAGE_UNITS } from "./utils";
import fetchData from "../requests/fetch";

/** Manages the retrieve or refetching of data used throughout the
* navigation, such as sidebar current user data and units data. */
export const useStorageUser = () => {
  let user 

  useEffect(() => {
    user = getLocalStorage<User>(LOCAL_STORAGE_USER);

    if (user) {
      fetchData<"User">({
        path: "users/current/",
        method: "GET",
        tag: ""
      }).then(result => {
        setLocalStorage(LOCAL_STORAGE_USER, result.data);
      });
    }
  }, []);

  return {user}
}

export const useStorageUnits = () => {
  let units

  useEffect(() => {
    units = getLocalStorage<Unit[]>(LOCAL_STORAGE_UNITS);

    if (units == undefined) {
      retrieve({ request: "Units" }).then(result => {
        setLocalStorage(LOCAL_STORAGE_UNITS, result.data);
      });
    }
  }, []);

  return {units}
}
