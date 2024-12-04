import { useEffect, useState } from "react"
import { 
  getLocalStorage, 
  setLocalStorage, 
} from "./utils";
import { User } from "../types/data/users";
import { Unit } from "../types/data/units";
import { retrieve } from "../requests/generics/retrieve";
import { LOCAL_STORAGE_USER, LOCAL_STORAGE_UNITS, LOCAL_STORAGE_SETTINGS } from "./utils";
import fetchData from "../requests/fetch";
import { Settings } from "../types/settings";

/** Manages the retrieve or refetching of data used throughout the
* navigation, such as sidebar current user data and units data. */
export const useStorageUser = () => {
  let user: any;

  useEffect(() => {
    user = getLocalStorage<User>(LOCAL_STORAGE_USER);

    if (user == undefined) {
      fetchData<"User">({
        path: "users/current/",
        method: "GET",
        tag: ""
      }).then(result => {
        if (result.code == 200) {
          setLocalStorage(LOCAL_STORAGE_USER, result.data);
        }
      });
    }
  }, []);

  return {user}
}

export const useStorageUnits = () => {
  let units: any

  useEffect(() => {
    units = getLocalStorage<Unit[]>(LOCAL_STORAGE_UNITS);

    if (units == undefined) {
      retrieve({ request: "Units" }).then(result => {
        if (result.code == 200) {
          setLocalStorage(LOCAL_STORAGE_UNITS, result.data);
        }
      });
    }
  }, []);

  return {units}
}

export const useStorageSettings = () => {
  let settings

  useEffect(() => {
    settings = getLocalStorage<Settings>(LOCAL_STORAGE_SETTINGS);

    if (settings == undefined) {
      fetchData<"Settings">({
        path: "settings/",
        method: "GET",
        tag: "Settings"
      }).then(result => {
        if (result.code == 200) {
          setLocalStorage(LOCAL_STORAGE_SETTINGS, result.data);
        }
      });
    }
  }, []);

  return {settings}
}

export const useStorageUserNext = () => {
  //const [user, setUser] = useState(() => {
  //  const user = getLocalStorage<User>(LOCAL_STORAGE_USER)
  //  if (user != undefined) {
  //    return user
  //  }
  //  return {} as User
  //});

  //useEffect(() => {
  //  if (user == undefined) {
  //    fetchData<"User">({
  //      path: "users/current/",
  //      method: "GET",
  //      tag: ""
  //    }).then(result => {
  //      if (result.code == 200) {
  //        setLocalStorage(LOCAL_STORAGE_USER, result.data);
  //        const data = getLocalStorage<User>(LOCAL_STORAGE_USER)
  //        if (data) {
  //          setUser(data);
  //        }
  //      }
  //    });
  //  }
  //}, []);

  return { user }
}
