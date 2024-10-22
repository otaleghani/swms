"use client"

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../components/input";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  // dict
}

export default function SearchFilterPattern({
  search,
  setSearch
}: Props) {

  const [state, setState] = useState("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value)
  }

  const handleNotification = () => {
    const copy = JSON.parse(JSON.stringify(state))
    setSearch(copy)
    //setState(state)
  }

  return (
    <>
      <Input 
        type="text"
        placeholder="Your search.."
        //onChange={handleChange}
        //value={state}
        onBlur={handleNotification}
      />
    </>
  );
};
