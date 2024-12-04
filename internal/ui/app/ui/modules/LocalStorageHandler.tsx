"use client"

import { 
  useStorageUnits, 
  useStorageSettings,
  useStorageUser
} from "@/app/lib/storage/useStorage";


/** Used to manage the differet local storage like current user and units */
export default function LocalStorageHandler() {
  const {units} = useStorageUnits();
  const {user} = useStorageUser();
  const {settings} = useStorageSettings();

  return (<></>)
}
